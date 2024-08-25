// const User = require("../models/epicUser");
const User = require("../models/user");
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
    const { mobileNumber, fcmToken, timeZone } = req.body;

    if (!mobileNumber) {
      throw new CustomError("Mobile number is required", 400);
    }

    // Check if the user already exists
    let user = await User.findByMobileNumber(mobileNumber);

    // If the user does not exist, create a new user
    if (!user) {
      user = await User.create({
        mobileNumber,
        fcmToken,
        timeZone: timeZone || "UTC",
      });
      console.log(`New user created with mobile number: ${mobileNumber}`);
    } else {
      console.log(`User with mobile number: ${mobileNumber} already exists`);
      user = await User.updateById(user.id, {
        fcmToken: fcmToken || user.fcmToken,
        timeZone: timeZone || "UTC",
      });
    }

    // Create a JWT token
    const token = JWT.createToken(user, (options = { algorithm: "HS256" }));

    // Return the user data and token
    res.status(200).json(
      response(200, true, "Login successful", {
        user: user,
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
  } = req.body;

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

    // If an email is provided, check if it already exists for another user
    if (email) {
      const userByEmail = await User.findByEmail(email);
      if (userByEmail && userByEmail.id !== user.id) {
        throw new CustomError("Email already registered", 409);
      }
    }
    console.log(gender);

    if (gender) {
      if (["male", "female", "other"].indexOf(gender.toLowerCase()) === -1) {
        throw new CustomError(
          "Invalid gender provided. Must be either Male, Female, or Other",
          400
        );
      }
    }

    // Update user details
    user = await User.updateById(user.id, {
      fullName,
      fatherName,
      epicId,
      gender: gender.toLowerCase(),
      age,
      email,
      legislativeConstituency,
      boothNameOrNumber,
    });

    console.log(
      `User with mobile number: ${mobileNumber} updated successfully`
    );

    res.status(200).json(
      response(200, true, "User updated successfully", {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          fatherName: user.fatherName,
          epicId: user.epicId,
          gender: user.gender,
          age: user.age,
          legislativeConstituency: user.legislativeConstituency,
          boothNameOrNumber: user.boothNameOrNumber,
        },
      })
    );
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
  } = req.body;

  try {
    // Check if the mobile number from the token matches the mobile number in the request
    if (req.mobileNumber !== mobileNumber) {
      throw new CustomError("Unauthorized: Mobile number mismatch", 401);
    }

    // Find the user by mobile number
    let user = await User.findByMobileNumber(mobileNumber);
    if (!user) {
      throw new CustomError(
        "Epic User not found with the entered mobile number",
        404
      );
    }

    console.log(gender);
    if (gender) {
      if (["male", "female", "other"].indexOf(gender.toLowerCase()) === -1) {
        throw new CustomError(
          "Invalid gender provided. Must be either Male, Female, or Other",
          400
        );
      }
    }

    // Handle image file upload
    let image = req.file ? req.file.path : user.image;

    if (req.file) {
      if (user.image) await fileHelper.deleteFile(user.image);
    }

    // Update user details
    user = await User.updateById(user.id, {
      fullName: fullName || user.fullName,
      fatherName: fatherName || user.fatherName,
      epicId: epicId || user.epicId,
      gender: gender.toLowerCase() || user.gender,
      age: Number(age || user.age),
      email: email || user.email,
      legislativeConstituency:
        legislativeConstituency || user.legislativeConstituency,
      boothNameOrNumber: boothNameOrNumber || user.boothNameOrNumber,
      image,
    });

    console.log(
      `User with mobile number: ${mobileNumber} updated successfully`
    );

    res.status(200).json(
      response(200, true, "Epic User updated successfully", {
        epicUser: {
          fullName: epicUser.fullName,
          email: epicUser.email,
          mobileNumber: epicUser.mobileNumber,
          epicId: epicUser.epicId,
          image: epicUser.image,
          fcmToken: epicUser.fcmToken,
        },
      })
    );
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
      status,
    } = req.body;

    // Check if a user with the same mobile number, fcmToken, or email already exists
    const existingUser =
      (await User.findByMobileNumber(mobileNumber)) ||
      (await User.findByEmail(email));
    if (existingUser) {
      throw new CustomError(
        "User with this mobile number or email already exists",
        409
      );
    }

    // Create the new user
    const newUser = await User.create({
      fullName,
      fatherName,
      epicId,
      image: null,
      mobileNumber,
      fcmToken: "",
      legislativeConstituency,
      boothNameOrNumber,
      gender,
      age,
      email,
      timeZone: timeZone || "UTC",
      status: status !== undefined ? status : 1,
    });

    // Return success response
    res
      .status(201)
      .json(response(201, true, "User created successfully", newUser));
  } catch (error) {
    next(error);
  }
};
