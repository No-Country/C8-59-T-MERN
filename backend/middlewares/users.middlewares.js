// Models
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../tools/catchAsync");
const { AppError } = require("../tools/appError");

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    attributes: { exclude: ["password"] },
    where: { id },
  });

  // If user doesn't exist, send error message
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  req.user = user;
  next();
});

module.exports = {
  userExists,
};
