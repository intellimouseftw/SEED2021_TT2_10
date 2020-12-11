const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const randtoken = require("rand-token");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const request = require("request");

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

      const options = {
        uri:
          "https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/login",
        body: JSON.stringify(postData),
        method: "POST",
        headers: {
          "user-agent": "node.js",
          "Content-Type": "application/json",
          "x-api-key": "Z1DcxhVb3J2TR8rrWiqJh1vFGMHJMPI0a8Wi6Wse",
        },
      };
      request(options, (error, response, body) => {
        if (error) console.log(error);

        if (response.statusCode !== 200) {
          return res.status(404).json({ msg: "Invalid credentials" });
        }

        const dbsData = JSON.parse(body);
        dbsData.token = token;
        res.send(dbsData);
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
