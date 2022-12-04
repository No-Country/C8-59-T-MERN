const { Review } = require("../models/review.model");

// Utils
const { catchAsync } = require("../tools/catchAsync");
const { AppError } = require("../tools/appError");

const reviewExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    where: { id },
  });

  if (!review) {
    return next(new AppError("Review not found", 404));
  }

  req.review = review;
  next();
});

module.exports = { reviewExists };
