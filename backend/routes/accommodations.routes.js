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
const {
  protectSession,
  protectReviewsOwners,
  protectAccommodationsOwners,
} = require("../middlewares/auth.middlewares");
const {
  createAccommodationValidators,
} = require("../middlewares/validators.middlewares");

const { upload } = require("../tools/multer");

const accommodationRouter = express.Router();

accommodationRouter.get("/", getAllAccommodations);
accommodationRouter.get("/:id", accommodationExistsById, getAccommodationById);

accommodationRouter.use(protectSession);

accommodationRouter.post(
  "/",
  upload.array("accommodationImg", 5),
  createAccommodationValidators,
  createAccommodation
);
accommodationRouter.patch(
  "/:id",
  accommodationExists,
  protectAccommodationsOwners,
  updateAccommodation
);
accommodationRouter.delete(
  "/:id",
  accommodationExists,
  protectAccommodationsOwners,
  deleteAccommodation
);

accommodationRouter.post("/reviews/:id", accommodationExists, createReview);
accommodationRouter.patch(
  "/reviews/:id",
  reviewExists,
  protectReviewsOwners,
  updateReview
);
accommodationRouter.delete(
  "/reviews/:id",
  reviewExists,
  protectReviewsOwners,
  deleteReview
);

module.exports = { accommodationRouter };
