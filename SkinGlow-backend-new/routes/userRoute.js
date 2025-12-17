const express = require("express");
const { registerUser, loginUser, getUsers } = require("../controller/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUsers", getUsers);

module.exports = router;