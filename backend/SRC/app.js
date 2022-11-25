const express = require("express");
const initModels = require("./models/initModels");
const db = require("./tools/database");

//Routers
const { accommodationRouter } = require("./routes/accommodations.routes");

const app = express();

app.use(express.json());

db.authenticate()
  .then(() => {
    console.log("Database Authenticated");
  })
  .catch((e) => {
    console.log(e);
  });

initModels();

db.sync()
  .then(() => {
    console.log("Database Synced");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is runing ok" });
});

app.listen(7000, () => {
  console.log("Server listening on port 7000");
});

//Define endpoints
app.use("/api/v1/accommodations", accommodationRouter);

// Global error handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "fail";

  res.status(statusCode).json({
    status,
    message: error.message,
    error,
    stack: error.stack,
  });
});

// Catch non-existing endpoints
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} ${req.url} does not exists in our server`,
  });
});

module.exports = { app };
