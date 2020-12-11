const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const API_SERVICE_URL =
  "https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020";

const loginRoute = require("./routes/login");
const extendSessionRoute = require("./routes/extendSession");

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ih7xw.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("Connected to database!");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(helmet());
app.use(compression());
// app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Define Routes

app.use(
  "/login",
  loginRoute
  // createProxyMiddleware({
  //   target: API_SERVICE_URL + "/login",
  //   changeOrigin: false,
  // })
);
app.use("/token", extendSessionRoute);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});
