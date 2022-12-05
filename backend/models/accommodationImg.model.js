const { DataTypes, db } = require("../tools/database");
const { Accommodation } = require("./accommodation.model");

const AccommodationImg = db.define("accommodationImg", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  imgUrl: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  accommodationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      key: "id",
      model: Accommodation,
    },
  },
  status: {
    allowNull: false,
    defaultValue: "active",
    type: DataTypes.STRING,
  },
});

module.exports = { AccommodationImg };
