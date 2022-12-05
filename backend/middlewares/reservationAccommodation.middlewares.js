const { Accommodation } = require("../models/accommodation.model");

// Utils
const { catchAsync } = require("../tools/catchAsync");
const { AppError } = require("../tools/appError");

const reservationAccomodationExists = catchAsync(async (req, res, next) => {
  const { accommodationId } = req.body;

  const accommodation = await Accommodation.findOne({
    where: { id: accommodationId, status: "active" },
  });

  if (!accommodation) {
    return next(new AppError("Accommodation not found", 404));
  }

  req.accommodation = accommodation;
  next();
});

module.exports = { reservationAccomodationExists };
