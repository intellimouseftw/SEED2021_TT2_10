const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const isAuth = require("../middleware/is-auth");
const randtoken = require("rand-token");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    // const reqData = await req;
    // await console.log(reqData);
    // const APIkey = req.headers
    const post_data = {
      username: req.body.username,
      password: req.body.password,
    };

    let loadedUser;
    const user = await User.findOne({ username: post_data.username });
    if (!user) {
      const error = new Error("Invalid username or password.");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    // const isValid = await bcrypt.compare(password, user.password);

    // if (!isValid) {
    //   const error = new Error("Invalid username or password");
    //   error.statusCode = 401;
    //   throw error;
    // }

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
    //   "https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/login",
    //   { username: req.body.username, password: req.body.password },
    //   { "x-api-key": "Z1DcxhVb3J2TR8rrWiqJh1vFGMHJMPI0a8Wi6Wse" }
    // );
    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
      refreshToken: refreshToken,
      // custID: dbsData.custID,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

module.exports = router;
