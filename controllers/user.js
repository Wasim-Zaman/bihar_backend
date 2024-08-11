const User = require("../models/user");
const CustomError = require("../utils/error");
const response = require("../utils/response");
const JWT = require("../utils/jwt");

exports.login = async (req, res, next) => {
  try {
    const { mobileNumber, fcmToken } = req.body;

    if (!mobileNumber) {
      throw new CustomError("Mobile number is required", 400);
    }

    if (!fcmToken) {
      throw new CustomError("Fcm token is required", 400);
    }

    // Check if the user already exists
    let user = await User.findByMobileNumber(mobileNumber);

    // If the user does not exist, create a new user
    if (!user) {
      user = await User.create({ mobileNumber, fcmToken });
      console.log(`New user created with mobile number: ${mobileNumber}`);
    } else {
      console.log(`User with mobile number: ${mobileNumber} already exists`);
      user = await User.updateById(user.id, { fcmToken });
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

    // Update user details
    user = await User.updateById(user.id, {
      fullName,
      fatherName,
      epicId,
      gender,
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
        "User not found with the entered mobile number",
        404
      );
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
      gender: gender || user.gender,
      age: age || user.age,
      email: email || user.email,
      legislativeConstituency:
        legislativeConstituency || user.legislativeConstituency,
      boothNameOrNumber: boothNameOrNumber || user.boothNameOrNumber,
      image,
    });

    console.log(
      `User with mobile number: ${mobileNumber} updated successfully`
    );

    res
      .status(200)
      .json(response(200, true, "User updated successfully", user));
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
      throw new CustomError("No users found", 404);
    }

    res
      .status(200)
      .json(response(200, true, "Users retrieved successfully", result));
  } catch (error) {
    next(error);
  }
};
