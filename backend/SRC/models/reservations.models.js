const { DataTypes } = require("sequelize");
const db = require("../tools/database");
const Accommodation = require("./accommodations.models");
const User = require("./users.models");

const Reservation = db.define("reservation", {
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
		field: "accommodation_id",
		references: {
			key: "id",
			model: Accommodation,
		},
	},
	arrival: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	departure: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	isFinished: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
		field: "is_finished",
	},
	isCanceled: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
		field: "is_canceled",
	},
});

module.exports = Reservation;
