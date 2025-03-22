const express = require("express");
const router = express.Router();
const { handlelogin, handleregister } = require("../Controller/authController");

router.post('/login', handlelogin);
router.post('/register',handleregister);

module.exports = router;