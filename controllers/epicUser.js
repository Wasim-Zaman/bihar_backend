// const User = require("../models/epicUser");
const User = require("../models/epicUser");
const CustomError = require("../utils/error");
const response = require("../utils/response");
const JWT = require("../utils/jwt");
const fileHelper = require("../utils/file");

// Login or register a user based on mobile number
// exports.login = async (req, res, next) => {
//   try {
//     const { mobileNumber, fcmToken, epicId, timeZone } = req.body;

//     if (!mobileNumber) {
//       throw new CustomError("Mobile number is required", 400);
//     }

//     if (!fcmToken) {
//       throw new CustomError("Fcm token is required", 400);
//     }

//     if (!epicId) {
//       throw new CustomError("Epic ID is required", 400);
//     }

//     // Check if the user already exists
//     let epicUser = await User.findByMobileNumber(mobileNumber);

//     // If the user does not exist, create a new user
//     if (!epicUser) {
//       epicUser = await User.create({
//         mobileNumber,
//         fcmToken,
//         epicId,
//         timeZone: timeZone || "UTC",
//       });
//       console.log(`New user created with mobile number: ${mobileNumber}`);
//     } else {
//       epicUser = await User.updateById(epicUser.id, {
//         fcmToken,
//         epicId,
//         timeZone: timeZone || "UTC",
//       });
//       console.log(`User with mobile number: ${mobileNumber} already exists`);
//     }

//     // Create a JWT token
//     const token = JWT.createToken(epicUser, (options = { algorithm: "HS256" }));

//     // Return the user data and token
//     res.status(200).json(
//       response(200, true, "Login successful", {
//         epicUser: {
//           fullName: epicUser.fullName,
//           email: epicUser.email,
//           mobileNumber: epicUser.mobileNumber,
//           epicId: epicUser.epicId,
//           image: epicUser.image,
//           fcmToken: epicUser.fcmToken,
//         },
//         token,
//       })
//     );
//   } catch (error) {
//     console.log(`Error in login: ${error.message}`);
//     next(error);
//   }
// };

exports.login = async (req, res, next) => {
  try {
    const { mobileNumber, fcmToken, timeZone, voterId } = req.body;

    // Validate the required fields
    if (!mobileNumber) {
      throw new CustomError("Mobile number is required", 400);
    }

    if (!voterId) {
      throw new CustomError("Voter ID is required", 400);
    }

    // Find a user by voterId
    let userWithVoterId = await User.findByField("voterId", voterId);

    // Handle the case where the voterId is already used by a different user with a phone number
    if (
      userWithVoterId &&
      userWithVoterId.mobileNumber &&
      userWithVoterId.mobileNumber !== mobileNumber
    ) {
      throw new CustomError(
        "Voter ID already registered with another mobile number",
        409
      );
    }

    // Find a user by mobileNumber
    let userWithMobileNumber = await User.findByMobileNumber(mobileNumber);

    // Case 1: Admin created user with voterId but without mobileNumber
    if (userWithVoterId && !userWithVoterId.mobileNumber) {
      console.log(
        `User with voterId: ${voterId} found without mobile number. Updating with new mobile number: ${mobileNumber}`
      );
      // Update the user with the mobileNumber and other details
      userWithVoterId = await User.updateById(userWithVoterId.id, {
        mobileNumber,
        fcmToken,
        timeZone: timeZone || "UTC",
      });
      userWithMobileNumber = userWithVoterId; // Assign the updated user to userWithMobileNumber for JWT token creation
    } else if (userWithMobileNumber) {
      // Case 2: User already exists with the mobileNumber
      console.log(`User with mobile number: ${mobileNumber} already exists`);

      // Check if the existing user's voterId is different
      if (userWithMobileNumber.voterId !== voterId) {
        throw new CustomError("Voter ID mismatch for this mobile number", 409);
      }

      // Update the user's details
      userWithMobileNumber = await User.updateById(userWithMobileNumber.id, {
        fcmToken: fcmToken || userWithMobileNumber.fcmToken,
        timeZone: timeZone || "UTC",
      });
    } else if (!userWithVoterId) {
      // Case 3: No user exists with this voterId and mobileNumber, create a new user
      console.log(
        `No user found with voterId: ${voterId} or mobile number: ${mobileNumber}. Creating new user.`
      );
      userWithMobileNumber = await User.create({
        mobileNumber,
        fcmToken,
        timeZone: timeZone || "UTC",
        voterId,
      });
    } else {
      // If userWithVoterId has a mobileNumber, it means it's already handled above, no need to handle here
      userWithMobileNumber = userWithVoterId;
    }

    // Create a JWT token
    const token = JWT.createToken(userWithMobileNumber, { algorithm: "HS256" });

    // Return the user data and token
    res.status(200).json(
      response(200, true, "Login successful", {
        user: userWithMobileNumber,
        token,
      })
    );
  } catch (error) {
    console.log(`Error in login: ${error.message}`);
    next(error);
  }
};

exports.register = async (req, res, next) => {
  const {
    fullName,
    fatherName,
    epicId,
    mobileNumber,
    gender,
    age,
    email,
    legislativeConstituency,
    boothNameOrNumber,
    voterId,
  } = req.body;

  console.log(JSON.stringify(req.body));

  try {
    // Check if the mobile number from the token matches the mobile number in the request
    if (req.mobileNumber !== mobileNumber) {
      throw new CustomError("Unauthorized: Mobile number mismatch", 401);
    }

    // Find the user by mobile number
    let user = await User.findByMobileNumber(mobileNumber);
    if (!user) {
      throw new CustomError(
        "User not found with the entered mobile number",
        404
      );
    }

    // check if the voterId is already registered
    let existUser = await User.findByField("voterId", voterId);
    if (existUser && existUser.id !== user.id) {
      throw new CustomError("Voter ID already registered", 409);
    }

    // If an email is provided, check if it already exists for another user
    if (email) {
      const userByEmail = await User.findByEmail(email);
      if (userByEmail && userByEmail.id !== user.id) {
        throw new CustomError("Email already registered", 409);
      }
    }

    // if (gender) {
    //   if (["male", "female", "other"].indexOf(gender.toLowerCase()) === -1) {
    //     throw new CustomError(
    //       "Invalid gender provided. Must be either Male, Female, or Other",
    //       400
    //     );
    //   }
    // }

    // Update user details
    user = await User.updateById(user.id, {
      fullName: fullName ?? user.fullName,
      fatherName: fatherName ?? user.fatherName,
      epicId:
        epicId == null ? user.epicId : epicId == voterId ? epicId : user.epicId,
      gender: gender ?? user.gender,
      age: Number(age ?? user.age),
      email: email ?? user.email,
      legislativeConstituency:
        legislativeConstituency ?? user.legislativeConstituency,
      boothNameOrNumber: boothNameOrNumber ?? boothNameOrNumber,
      voterId: voterId ?? user.voterId,
    });

    console.log(
      `User with mobile number: ${mobileNumber} updated successfully`
    );

    res
      .status(200)
      .json(response(200, true, "User updated successfully", user));
  } catch (error) {
    console.log(`Error in register: ${error.message}`);
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const {
    fullName,
    fatherName,
    epicId,
    mobileNumber,
    gender,
    age,
    email,
    legislativeConstituency,
    boothNameOrNumber,
    voterId,
  } = req.body;

  try {
    // Check if a user with the given voterId exists and is not the current user
    let existUser = await User.findByField("voterId", voterId);
    if (existUser && existUser.id !== req.user.id) {
      throw new CustomError("Voter ID already registered", 409);
    }

    // Check if the mobile number from the token matches the mobile number in the request
    if (req.mobileNumber !== mobileNumber) {
      throw new CustomError("Unauthorized: Mobile number mismatch", 401);
    }

    // Find the user by mobile number
    const user = await User.findByMobileNumber(mobileNumber);
    if (!user) {
      throw new CustomError(
        "Epic User not found with the entered mobile number",
        404
      );
    }

    // Validate gender if provided
    if (gender) {
      if (!["male", "female", "other"].includes(gender.toLowerCase())) {
        throw new CustomError(
          "Invalid gender provided. Must be either Male, Female, or Other",
          400
        );
      }
    }

    // Handle image file upload
    let image = req.file ? req.file.path : user.image;

    // Delete the old image if a new one is uploaded
    if (req.file && user.image) {
      await fileHelper.deleteFile(user.image);
    }

    // Create the updated data object
    const data = {
      fullName: fullName || user.fullName,
      fatherName: fatherName || user.fatherName,
      epicId: epicId || user.epicId,
      gender: gender || user.gender,
      age: Number(age || user.age),
      email: email || user.email,
      voterId: voterId || user.voterId,
      legislativeConstituency:
        legislativeConstituency || user.legislativeConstituency,
      boothNameOrNumber: boothNameOrNumber || user.boothNameOrNumber,
      image,
    };

    // Update user details in the database
    const updatedUser = await User.updateById(user.id, data);

    // If the update fails, throw an error
    if (!updatedUser) {
      throw new CustomError("Failed to update user", 500);
    }

    console.log(
      `User with mobile number: ${mobileNumber} updated successfully`
    );

    // Send the success response
    res
      .status(200)
      .json(response(200, true, "Epic User updated successfully", updatedUser));
  } catch (error) {
    console.log(`Error in updateUser: ${error.message}`);
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const result = await User.get(Number(page), Number(limit), query);
    if (!result || result.users.length === 0) {
      throw new CustomError("No Epic Users found", 404);
    }

    res
      .status(200)
      .json(response(200, true, "Epic Users retrieved successfully", result));
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    if (user.image) {
      await fileHelper.deleteFile(user.image);
    }
    const deletedUser = await User.deleteById(id);
    console.log(`User with id: ${id} deleted successfully`);
    if (!deletedUser) {
      throw new CustomError("Failed to delete user", 500);
    }

    res
      .status(200)
      .json(response(200, true, "User deleted successfully", deletedUser));
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new CustomError("Unauthorized: No user found in token", 401);
    }

    res
      .status(200)
      .json(response(200, true, "User retrieved successfully", req.user));
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if the status is valid
    if (status !== 0 && status !== 1) {
      throw new CustomError("Invalid status provided. Must be 0 or 1", 400);
    }

    // Find the user by id
    let user = await User.findById(id);
    if (!user) {
      throw new CustomError("User not found with the provided id", 404);
    }

    // Update the status
    user = await User.updateStatus(id, status);
    console.log(`User status with id: ${id} updated successfully`);

    res.status(200).json(
      response(200, true, "User status updated successfully", {
        id: user.id,
        status: user.status,
      })
    );
  } catch (error) {
    console.log(`Error in updateStatus: ${error.message}`);
    next(error);
  }
};

exports.searchUsers = async (req, res, next) => {
  try {
    const { phoneNumber = "", epicId = "", page = 1, limit = 10 } = req.query;

    // Check if at least one search parameter is provided
    if (!phoneNumber && !epicId) {
      return res.status(400).json({
        success: false,
        message:
          "At least one of phoneNumber or epicId is required for searching users",
      });
    }

    // Fetch users based on phoneNumber and/or epicId
    const result = await User.searchByMobileNumberAndEpicId(
      phoneNumber,
      epicId,
      Number(page),
      Number(limit)
    );

    // If no users found
    if (!result.users.length) {
      return res.status(404).json({
        success: false,
        message: "No users found matching the search criteria",
      });
    }

    // Return the users found
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.users,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Error in searchUsers controller:", error);
    next(error); // Pass the error to the global error handler
  }
};

exports.createUser = async (req, res, next) => {
  try {
    // Extract data from request body
    const {
      fullName,
      fatherName,
      epicId,
      mobileNumber,
      legislativeConstituency,
      boothNameOrNumber,
      gender,
      age,
      email,
      timeZone,
      voterId,
      status,
    } = req.body;

    // Check if voterId is provided
    if (!voterId) {
      throw new CustomError("Voter ID is required", 400);
    }

    // Check if a user with the same mobile number, email, or voter ID already exists
    const existingUser =
      (mobileNumber && (await User.findByMobileNumber(mobileNumber))) ||
      (email && (await User.findByEmail(email))) ||
      (await User.findByField("voterId", voterId));

    if (existingUser) {
      throw new CustomError(
        "User with this mobile number, voterId or email already exists",
        409
      );
    }

    // Create the new user
    const newUser = await User.create({
      fullName,
      fatherName,
      epicId: epicId == voterId ? epicId : voterId,
      image: null,
      mobileNumber: mobileNumber || null,
      fcmToken: "",
      legislativeConstituency: legislativeConstituency || null,
      boothNameOrNumber: boothNameOrNumber || null,
      gender: gender || null,
      age: age || null,
      email: email || null,
      voterId,
      timeZone: timeZone || "UTC",
      status: status !== undefined ? Number(status) : 1,
    });

    // Return success response
    res
      .status(201)
      .json(response(201, true, "User created successfully", newUser));
  } catch (error) {
    next(error);
  }
};
