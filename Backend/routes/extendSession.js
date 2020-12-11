const express = require("express");
const { body } = require("express-validator/check");

const User = require("../models/user");
const authController = require("../controllers/login");
const isAuth = require("../middleware/is-auth");

const router = express.Router();
