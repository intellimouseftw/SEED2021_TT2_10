const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const isAuth = require("../middleware/is-auth");
const randtoken = require("rand-token");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post(
  "/",
  [
    body("username", "Please enter a valid username")
      .isString()
      .not()
      .isEmpty(),
    body("password", "Please enter a valid password")
      .isString()
      .not()
      .isEmpty(),
  ],
  async (req, res, next) => {
    try {
      const postData = {
        username: req.body.username,
        password: req.body.password,
      };

      const user = await User.findOne({ username: postData.username });
      if (!user) {
        const error = new Error("Invalid username or password.");
        error.statusCode = 401;
        throw error;
      }
      let loadedUser = user;

      const isEqual = await bcrypt.compare(
        postData.password,
        loadedUser.password
      );

      if (!isEqual) {
        const error = new Error("Invalid username or password.");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        { username: loadedUser.username },
        "DBSTECHTREK2020",
        { expiresIn: "1h" }
      );

      const refreshToken = randtoken.uid(256);
      const newToken = new Token({
        userId: loadedUser._id,
        refreshToken: refreshToken,
      });

      await newToken.save();
      // const dbsData = await axios.post(
      // "https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/login",
      //   { username: req.body.username, password: req.body.password },
      //   { "x-api-key": "Z1DcxhVb3J2TR8rrWiqJh1vFGMHJMPI0a8Wi6Wse" }
      // );
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        refreshToken: refreshToken,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
);

module.exports = router;
