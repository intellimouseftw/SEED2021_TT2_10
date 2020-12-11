const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const isAuth = require("../middleware/is-auth");
const refreshToken = require("rand-token");
const Token = require("../models/token");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const post_data = {
      username: req.body.username,
      password: req.body.password,
    };

    let loadedUser;
    const user = await User.findOne({ username: username });
    if (!user) {
      const error = new Error("Invalid username or password.");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      const error = new Error("Invalid username or password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { username: loadedUser.username },
      "DBSTECHTREK2020",
      { expiresIn: "1h" }
    );

    const refreshToken = randtoken.uid(256);
    let tokenDetails = {};
    tokenDetails.userId = loadedUser._id;
    tokenDetails.refreshToken = refreshToken;

    await Token.save();
    res.status(200).json({
      token: tokenDetails,
      userId: loadedUser._id.toString(),
      refreshToken: refreshToken,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});
