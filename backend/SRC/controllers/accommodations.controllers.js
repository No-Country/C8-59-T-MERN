const { User } = require("../models/user.model");
const { Accommodation } = require("../models/accommodation.model");
const { Review } = require("../models/review.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../tools/appError");

const createAccommodation = catchAsync(async (req, res, next) => {
  //const { sessionUser } = req;
  const {
    title,
    description,
    rooms,
    beds,
    bathrooms,
    price,
    location,
    rating,
  } = req.body;

  const newAccommodation = await Accommodation.create({
    title,
    description,
    rooms,
    beds,
    bathrooms,
    price,
    location,
    rating,
    //userId: sessionUser.id,
    userId: 1,
  });

  //await uploadAccommodationImgs(req.files, newAccommodation.id);

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
            attributes: { exclude: ["password"] },
          },
        ],
      },
    ],
  });

  res.status(200).json({
    status: "success",
    data: { accommodations },
  });
});

const getAccommodationById = catchAsync(async (req, res, next) => {
  const { accommodationById } = req;

  res.status(200).json({
    status: "success",
    data: { accommodationById },
  });
});

const updateAccommodation = catchAsync(async (req, res, next) => {
  const { title, description, rooms, beds, bathrooms, price, location } =
    req.body;
  const { accommodation } = req;

  await accommodation.update({
    title,
    description,
    rooms,
    beds,
    bathrooms,
    price,
    location,
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
  //const { sessionUser } = req;

  const newReview = await Review.create({
    //userId: sessionUser.id,
    userId: 1,
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

