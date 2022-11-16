const { DataTypes } = require("sequelize");
const db = require("../tools/database");
const Accommodation = require("./accommodations.models");

const AccommodationImg = db.define("accommodations_imgs", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	accommodationUrl: {
		type: DataTypes.STRING,
		validate: {
			isUrl: true,
		},
		field: "accommodation_url",
	},
	accommodationId: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			key: "id",
			model: Accommodation,
		},
	},
});

module.exports = AccommodationImg;
