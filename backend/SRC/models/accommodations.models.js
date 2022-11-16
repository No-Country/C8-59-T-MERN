const { DataTypes } = require("sequelize");
const db = require("../tools/database");
const User = require("./users.models");

const Accommodation = db.define(
	"accommodations",
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
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
			type: DataTypes.STRING,
			allowNull: false,
		},
		estatus: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
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
	},
	{ timestamps: false }
);

module.exports = Accommodation;
