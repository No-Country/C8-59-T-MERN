const { Accommodation } = require("../models/accommodation.model");
const { Review } = require("../models/review.model");
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../tools/catchAsync");

const accommodationExists = catchAsync(async (req, res, next) => {
  const { accommodationId } = req.params;

  const accommodation = await Accommodation.findOne({
    where: { id: accommodationId, status: "active" },
  });

  if (!accommodation) {
    return res.status(404).json({
      status: "error",
      message: "Accommodation not found",
    });
  }

  req.accommodation = accommodation;
  next();
});

const accommodationExistsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const accommodationById = await Accommodation.findOne({
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
            attributes: { exclude: ["password"] },
          },
        ],
      },
    ],
  });

  if (!accommodationById) {
    return res.status(404).json({
      status: "error",
      message: "Accommodation not found",
    });
  }

  req.accommodationById = accommodationById;
  next();
});

module.exports = { accommodationExists, accommodationExistsById };
