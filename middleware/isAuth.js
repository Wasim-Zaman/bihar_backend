const jwt = require("jsonwebtoken");
require("dotenv").config();

const CustomError = require("../utils/error");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new CustomError("You are not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const error = new CustomError(
        "Your session has expired. Please log in again."
      );
      error.statusCode = 401;
      next(error);
    } else {
      err.statusCode = 500;
      err.message = null;
      next(err);
    }
    return;
  }

  if (!decodedToken) {
    const error = new CustomError("You are not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  req.user = decodedToken;
  req.mobileNumber = decodedToken.mobileNumber;

  next();
};
