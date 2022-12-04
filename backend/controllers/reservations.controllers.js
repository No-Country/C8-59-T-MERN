const { Reservation } = require("../models/reservation.model");
const { Accommodation } = require("../models/accommodation.model");

// Utils
const { catchAsync } = require("../tools/catchAsync");
const { AppError } = require("../tools/appError");

const createReservation = catchAsync(async (req, res, next) => {
  const { accommodationId, arrival, departure } = req.body;
  const { sessionUser } = req;
  const { accommodation } = req;

  const newReservation = await Reservation.create({
    userId: sessionUser.id,
    accommodationId,
    arrival,
    departure,
  });

  res.status(201).json({
    status: "success",
    data: { newReservation },
  });
});

const getAllReservations = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const reservations = await Reservation.findAll({
    where: { userId: sessionUser.id },
    required: false,
    include: [
      {
        model: Accommodation,
        required: false,
        where: { status: "active" },
      },
    ],
  });

  res.status(200).json({
    status: "success",
    data: { reservations },
  });
});

const completeReservation = catchAsync(async (req, res, next) => {
  const { reservation } = req;

  await reservation.update({ status: "finished" });

  res.status(200).json({
    status: "success",
    data: { reservation },
  });
});

const cancelReservation = catchAsync(async (req, res, next) => {
  const { reservation } = req;

  await reservation.update({ status: "cancelled" });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  createReservation,
  getAllReservations,
  completeReservation,
  cancelReservation,
};
