const { DataTypes, db } = require("../tools/database");
const { User } = require("./user.model");

const Accommodation = db.define("accommodation", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  beds: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bathrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  facilities: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
    references: {
      key: "id",
      model: User,
    },
  },
});

module.exports = { Accommodation };
