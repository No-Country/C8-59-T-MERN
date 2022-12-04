const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");
const { Reservation } = require("../models/reservation.model");
const { Accommodation } = require("../models/accommodation.model");

// Utils
const { catchAsync } = require("../tools/catchAsync");
const { AppError } = require("../tools/appError");

dotenv.config({ path: "./config.env" });

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

const getReservationById = catchAsync(async (req, res, next) => {
  const { reservation } = req;

  res.status(200).json({
    status: "success",
    data: { reservation },
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, phone, country } = req.body;

  // Encrypt the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone,
    country,
  });

  // Remove password from response
  newUser.password = undefined;

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email } = req.body;
  const { user } = req;

  await user.update({ firstName, lastName, email });

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "deleted" });

  res.status(204).json({ status: "success" });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate that user exists with given email
  const user = await User.findOne({
    attributes: { exclude: ["role", "status", "createdAt", "updatedAt"] },
    where: { email, status: "active" },
  });

  // Compare password with db
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid credentials", 400));
  }

  // Generate JWT
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  user.password = undefined;

  res.status(200).json({ status: "success", data: { token, user } });
});

module.exports = {
  getAllReservations,
  getReservationById,
  createUser,
  updateUser,
  deleteUser,
  login,
};
