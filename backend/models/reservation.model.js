const { DataTypes, db } = require("../tools/database");
const { Accommodation } = require("./accommodation.model");
const { User } = require("./user.model");

const Reservation = db.define("reservation", {
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
    field: "accommodation_id",
    references: {
      key: "id",
      model: Accommodation,
    },
  },
  arrival: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  departure: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "active",
  },
});

module.exports = { Reservation };
