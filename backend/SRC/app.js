const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({ message: "Server is runing ok" });
});

app.listen(7000, () => {
	console.log("Server listening on port 7000");
});
