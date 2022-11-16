const { DataTypes } = require("sequelize");
const db = require("../tools/database");
const Accommodation = require("./accommodations.models");
const User = require("./users.models");

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
		type: DataTypes.TEXT,
	},
	reting: {
		type: DataTypes.INTEGER,
	},
});

module.exports = Review;
