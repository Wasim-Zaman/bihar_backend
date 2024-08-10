const User = require("../models/epicUser");
const CustomError = require("../utils/error");
const response = require("../utils/response");
const JWT = require("../utils/jwt");

// Login or register a user based on mobile number
exports.login = async (req, res, next) => {
  try {
    const { mobileNumber, fcmToken, epicId } = req.body;

    if (!mobileNumber) {
      throw new CustomError("Mobile number is required", 400);
    }

    if (!fcmToken) {
      throw new CustomError("Fcm token is required", 400);
    }

    if (!epicId) {
      throw new CustomError("Epic ID is required", 400);
    }

    // Check if the user already exists
    let epicUser = await User.findByMobileNumber(mobileNumber);

    // If the user does not exist, create a new user
    if (!epicUser) {
      epicUser = await User.create({ mobileNumber, fcmToken, epicId });
      console.log(`New user created with mobile number: ${mobileNumber}`);
    } else {
      console.log(`User with mobile number: ${mobileNumber} already exists`);
    }

    // Create a JWT token
    const token = JWT.createToken(epicUser, (options = { algorithm: "HS256" }));

    // Return the user data and token
    res.status(200).json(
      response(200, true, "Login successful", {
        epicUser: {
          fullName: epicUser.fullName,
          email: epicUser.email,
          mobileNumber: epicUser.mobileNumber,
          epicId: epicUser.epicId,
          image: epicUser.image,
          fcmToken: epicUser.fcmToken,
        },
        token,
      })
    );
  } catch (error) {
    console.log(`Error in login: ${error.message}`);
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

    res.status(200).json(
      response(200, true, "User updated successfully", {
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
