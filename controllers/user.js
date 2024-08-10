const User = require("../models/user");
const CustomError = require("../utils/error");
const response = require("../utils/response");
const JWT = require("../utils/jwt");

// Login or register a user based on mobile number
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

// Register or update a user based on mobile number with authorization check
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
