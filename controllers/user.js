const User = require("../models/user");
const CustomError = require("../utils/error");
const response = require("../utils/response");
const JWT = require("../utils/jwt");
const Bcrypt = require("../utils/bcrypt");

// Register a new user
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
    let existingUser = await User.findByMobileNumber(mobileNumber);
    if (existingUser) {
      throw new CustomError(
        "User already exists with the entered mobile number",
        400
      );
    }
    existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new CustomError("User already exists with the entered email", 400);
    }

    const newUser = await User.create({
      fullName,
      fatherName,
      epicId,
      mobileNumber,
      gender,
      age,
      email,
      legislativeConstituency,
      boothNameOrNumber,
    });

    console.log(`User registered with email: ${email}`);

    res.status(201).json(
      response(201, true, "User registered successfully", {
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
        },
      })
    );
  } catch (error) {
    console.log(`Error in register: ${error.message}`);
    next(error);
  }
};

// Login an existing user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError("Email and password are required", 400);
    }

    const user = await User.findByEmail(email);
    if (!user) {
      throw new CustomError("No user found with the entered email", 401);
    }

    const isPasswordValid = await Bcrypt.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new CustomError("Invalid password entered", 401);
    }

    const token = JWT.createToken(user);

    res.status(200).json(
      response(200, true, "Login successful", {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
        token,
      })
    );
  } catch (error) {
    console.log(`Error in login: ${error.message}`);
    next(error);
  }
};
