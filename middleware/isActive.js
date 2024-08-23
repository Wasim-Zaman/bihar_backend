const User = require("../models/user");
const CustomError = require("../utils/error");

const isActive = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch the user by ID
    const user = await User.findById(userId);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    // Check if the user is active
    if (user.status === 0) {
      throw new CustomError(
        "You are blocked from the admin side and cannot perform new operations.",
        403
      );
    }

    // If the user is active, proceed to the next middleware or route handler
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isActive;
