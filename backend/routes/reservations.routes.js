const express = require("express");

// Controllers
const {
  createReservation,
  getAllReservations,
  completeReservation,
  cancelReservation,
} = require("../controllers/reservations.controllers");

// Middlewares
const {
  reservationExists,
} = require("../middlewares/reservations.middlewares");
const {
  reservationAccomodationExists,
} = require("../middlewares/reservationAccommodation.middlewares");
const { protectSession } = require("../middlewares/auth.middlewares");
const {
  protectReservationsOwners,
} = require("../middlewares/auth.middlewares");

const reservationRouter = express.Router();

reservationRouter.use(protectSession);

reservationRouter.post("/", reservationAccomodationExists, createReservation);
reservationRouter.get("/me", getAllReservations);
reservationRouter.patch(
  "/:id",
  reservationExists,
  protectReservationsOwners,
  completeReservation
);
reservationRouter.delete(
  "/:id",
  reservationExists,
  protectReservationsOwners,
  cancelReservation
);

module.exports = { reservationRouter };
