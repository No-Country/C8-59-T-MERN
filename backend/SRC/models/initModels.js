const { User } = require("./user.model");
const { Accommodation } = require("./accommodation.model");
const { AccommodationImg } = require("./accommodationImg.model");
const { Reservation } = require("./reservation.model");
const { Review } = require("./review.model");

const initModels = () => {
  //1 accommodation ---- M accommodationImg
  Accommodation.hasMany(AccommodationImg, { foreignKey: "accommodationId" });
  AccommodationImg.belongsTo(Accommodation);

  //1 accommodation ---- M reservation
  Accommodation.hasMany(Reservation, { foreignKey: "accommodationId" });
  Reservation.belongsTo(Accommodation);

  //1 accommodation ---- M review
  Accommodation.hasMany(Review, { foreignKey: "accommodationId" });
  Review.belongsTo(Accommodation);

  //1 user ---- M review
  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User);

  //1 user ---- M reservation
  User.hasMany(Reservation, { foreignKey: "userId" });
  Reservation.belongsTo(User);

  //1 user ------- M accommodation
  User.hasMany(Accommodation, { foreignKey: "userId" });
  Accommodation.belongsTo(User);
};

module.exports = initModels;
