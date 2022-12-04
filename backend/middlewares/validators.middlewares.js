const { body, validationResult } = require("express-validator");

// Utils
const { AppError } = require("../tools/appError");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body("firstName")
    .isString()
    .withMessage("First name must be a string")
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters"),
  body("lastName")
    .isString()
    .withMessage("Last name must be a string")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  checkValidations,
];

const createAccommodationValidators = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),
  body("description")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 3 })
    .withMessage("Description must be at least 3 characters long"),
  body("rooms")
    .isInt({ gt: 0 })
    .withMessage("Rooms number must be greater than 0"),
  body("beds")
    .isInt({ gt: 0 })
    .withMessage("Beds number must be greater than 0"),
  body("bathrooms")
    .isInt({ gt: 0 })
    .withMessage("Bathrooms number must be greater than 0"),
  body("rating")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be a number between 1 and 5"),
  checkValidations,
];

module.exports = {
  createUserValidators,
  createAccommodationValidators,
};
