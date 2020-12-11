const express = require("express");
const { body } = require("express-validator/check");

const User = require("../models/user");
const authController = require("../controllers/login");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const post_data = {
      username: req.body.username,
      password: req.body.password,
    };

    const options = {
      uri:
        "https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/login",
      body: JSON.stringify(post_data),
      method: "POST",
      headers: { "user-agent": "node.js", "Content-Type": "application/json" },
    };

    request(options, (error, response, body) => {
      if (error) console.log(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "Invalid credentials" });
      }

      res.json({ token: body });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
