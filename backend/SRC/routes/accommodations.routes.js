const express = require("express");

// Controllers
const {
  createAccommodation,
  getAllAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/accommodations.controllers");

// Middlewares
const {
  accommodationExists,
  accommodationExistsById,
} = require("../middlewares/accommodations.middlewares");
const { reviewExists } = require("../middlewares/reviews.middlewares");
//const {
//  protectSession,
//  protectReviewsOwners,
//} = require("../middlewares/auth.middlewares");
const {
  createAccommodationValidators,
} = require("../middlewares/validators.middlewares");

const accommodationRouter = express.Router();

accommodationRouter.get("/", getAllAccommodations);
accommodationRouter.get("/:id", accommodationExistsById, getAccommodationById);

//accommodationRouter.use(protectSession);

accommodationRouter.post(
  "/",
  createAccommodationValidators,
  createAccommodation
);
accommodationRouter.patch("/:id", accommodationExists, updateAccommodation);
accommodationRouter.delete("/:id", accommodationExists, deleteAccommodation);

accommodationRouter.post(
  "/reviews/:accommodationId",
  accommodationExists,
  createReview
);
accommodationRouter.patch("/reviews/:id", reviewExists, updateReview);
accommodationRouter.delete("/reviews/:id", reviewExists, deleteReview);

module.exports = { accommodationRouter };
