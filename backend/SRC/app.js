const express = require("express");
const initModels = require("./models/initModels");
const db = require("./tools/database");

const app = express();

app.use(express.json());

db.authenticate()
	.then(() => {
		console.log("Database Authenticated");
	})
	.catch((e) => {
		console.log(e);
	});

db.sync()
	.then(() => {
		console.log("Database Synced");
	})
	.catch((e) => {
		console.log(e);
	});

initModels();

app.get("/", (req, res) => {
	res.status(200).json({ message: "Server is runing ok" });
});

app.listen(7000, () => {
	console.log("Server listening on port 7000");
});
