const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const Token = require("../models/token");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/token", async (req, res, next) => {
  try {
    const username = req.body.username;
    let refreshToken = req.body.refreshToken;

    const refreshExists = await Token.findOne({ refreshToken: refreshToken });
    const user = await User.findOne({ username: username });

    if (!refreshExists || !user) {
      const error = new Error("Refresh token or user does not exist.");
      error.statusCode = 401;
      throw error;
    } else {
      const token = jwt.sign({ username: username }, "DBSTECHTREK2020", {
        expiresIn: "1h",
      });
    }
    let loadedUser = user;

    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});
