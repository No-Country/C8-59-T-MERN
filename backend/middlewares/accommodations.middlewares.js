const { Accommodation } = require("../models/accommodation.model");
const { Review } = require("../models/review.model");
const { User } = require("../models/user.model");
const { AccommodationImg } = require("../models/accommodationImg.model");
const { Reservation } = require("../models/reservation.model");

// Utils
const { catchAsync } = require("../tools/catchAsync");
const { AppError } = require("../tools/appError");

const accommodationExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const accommodation = await Accommodation.findOne({
    where: { id, status: "active" },
  });

  if (!accommodation) {
    return next(new AppError("Accommodation not found", 404));
  }

  req.accommodation = accommodation;
  next();
});

const accommodationExistsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const accommodation = await Accommodation.findOne({
    where: { id, status: "active" },
    required: false,
    include: [
      {
        model: Review,
        required: false,
        where: { status: "active" },
        attributes: ["id", "content", "rating", "status"],
        include: [
          {
            model: User,
            required: false,
            where: { status: "active" },
            attributes: ["id", "firstName", "lastName", "country"],
          },
        ],
      },
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: AccommodationImg },
      {
        model: Reservation,
        include: [
          {
            model: User,
            required: false,
            where: { status: "active" },
            attributes: ["id", "firstName", "lastName", "country"],
          },
        ],
      },
    ],
  });

  if (!accommodation) {
    return next(new AppError("Accommodation not found", 404));
  }

  req.accommodation = accommodation;
  next();
});

module.exports = { accommodationExists, accommodationExistsById };
