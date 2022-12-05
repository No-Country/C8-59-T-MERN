// Models
const { Reservation } = require("../models/reservation.model");
const { Accommodation } = require("../models/accommodation.model");

// Utils
const { catchAsync } = require("../tools/catchAsync");
const { AppError } = require("../tools/appError");

const reservationExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const reservation = await Reservation.findOne({
    where: { id, status: "active" },
  });

  if (!reservation) {
    return next(new AppError("Reservation not found", 404));
  }

  req.reservation = reservation;
  next();
});

const reservationExistsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const reservationById = await Reservation.findOne({
    where: { id: id, userId: sessionUser.id },
    include: [
      {
        model: Accommodation,
        required: false,
        where: { status: "active" },
      },
    ],
  });

  if (!reservationById) {
    return next(new AppError("Reservation not found", 404));
  }

  req.reservation = reservationById;
  next();
});

module.exports = { reservationExists, reservationExistsById };
