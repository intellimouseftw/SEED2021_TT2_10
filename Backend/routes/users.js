const express = require("express");

const isAuth = require("../middleware/is-auth");
const request = require("request");

const router = express.Router();

router.post(
  "/",
  isAuth,

  async (req, res, next) => {
    try {
      const options = {
        uri:
          "https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/users",
        // body: JSON.stringify(postData),
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
