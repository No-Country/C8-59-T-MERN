const { DataTypes } = require("sequelize");
const db = require("../tools/database");
const { Accommodation } = require("./accommodation.model");
const { User } = require("./user.model");

const Review = db.define("reviews", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "user_id",
    references: {
      key: "id",
      model: User,
    },
  },
  accommodationId: {
    type: DataTypes.UUID,
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
