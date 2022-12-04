const { DataTypes, db } = require("../tools/database");
const { Accommodation } = require("./accommodation.model");
const { User } = require("./user.model");

const Review = db.define("reviews", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
    references: {
      key: "id",
      model: User,
    },
  },
  accommodationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "acommodation_id",
    references: {
      key: "id",
      model: Accommodation,
    },
  },
  content: {
    type: DataTypes.STRING,
  },
  rating: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  status: {
    allowNull: false,
    defaultValue: "active",
    type: DataTypes.STRING,
  },
});

module.exports = { Review };
