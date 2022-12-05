const { User } = require("../models/user.model");
const { Accommodation } = require("../models/accommodation.model");
const { Review } = require("../models/review.model");
const { AccommodationImg } = require("../models/accommodationImg.model");
const { Reservation } = require("../models/reservation.model");

// Utils
const { catchAsync } = require("../tools/catchAsync");
const { AppError } = require("../tools/appError");

const {
  uploadAccommodationImgs,
  getAccommodationsImgsUrls,
  getAccommodationImgsUrlsbyID,
} = require("../tools/firebase");

const createAccommodation = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const {
    title,
    description,
    rooms,
    beds,
    bathrooms,
    price,
    facilities,
    city,
    country,
    rating,
  } = req.body;

  const newAccommodation = await Accommodation.create({
    title,
    description,
    rooms,
    beds,
    bathrooms,
    price,
    facilities,
    city,
    country,
    rating,
    userId: sessionUser.id,
  });

  await uploadAccommodationImgs(req.files, newAccommodation.id);

  res.status(201).json({
    status: "success",
    data: { newAccommodation },
  });
});

const getAllAccommodations = catchAsync(async (req, res, next) => {
  const accommodations = await Accommodation.findAll({
    where: { status: "active" },
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

  const accommodationsWithImgs = await getAccommodationsImgsUrls(
    accommodations
  );

  res.status(200).json({
    status: "success",
    data: { accommodations: accommodationsWithImgs },
  });
});

const getAccommodationById = catchAsync(async (req, res, next) => {
  const { accommodation } = req;

  const accommodationWithImgs = await getAccommodationImgsUrlsbyID(
    accommodation
  );

  res.status(200).json({
    status: "success",
    data: { accommodation: accommodationWithImgs },
  });
});

const updateAccommodation = catchAsync(async (req, res, next) => {
  const { title, description, rooms, beds, bathrooms, price, facilities } =
    req.body;
  const { accommodation } = req;

  await accommodation.update({
    title,
    description,
    rooms,
    beds,
    bathrooms,
    price,
    facilities,
  });

  res.status(200).json({
    status: "success",
    data: { accommodation },
  });
});

const deleteAccommodation = catchAsync(async (req, res, next) => {
  const { accommodation } = req;

  await accommodation.update({ status: "deleted" });

  res.status(204).json({ status: "success" });
});

const createReview = catchAsync(async (req, res, next) => {
  const { content, rating } = req.body;
  const { accommodation } = req;
  const { sessionUser } = req;

  const newReview = await Review.create({
    userId: sessionUser.id,
    content,
    rating,
    accommodationId: accommodation.id,
  });

  res.status(201).json({
    status: "success",
    data: { newReview },
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { content, rating } = req.body;
  const { review } = req;

  await review.update({ content, rating });

  res.status(200).json({
    status: "success",
    data: { review },
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: "deleted" });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  createAccommodation,
  getAllAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
  createReview,
  updateReview,
  deleteReview,
};
