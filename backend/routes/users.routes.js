const express = require("express");

// Controllers
const {
  getAllReservations,
  getAllAccommodationsByUser,
  getReservationById,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/users.controllers");

// Middlewares
const { userExists } = require("../middlewares/users.middlewares");
const {
  reservationExistsById,
} = require("../middlewares/reservations.middlewares");
const {
  protectSession,
  protectUsersAccount,
} = require("../middlewares/auth.middlewares");
const {
  createUserValidators,
} = require("../middlewares/validators.middlewares");

const userRouter = express.Router();

userRouter.post("/signup", createUserValidators, createUser);
userRouter.post("/login", login);

userRouter.use(protectSession);

userRouter.patch("/:id", userExists, protectUsersAccount, updateUser);
userRouter.delete("/:id", userExists, protectUsersAccount, deleteUser);
userRouter.get("/reservations", getAllReservations);
userRouter.get("/myaccommodations", getAllAccommodationsByUser);
userRouter.get("/reservations/:id", reservationExistsById, getReservationById);

module.exports = { userRouter };
