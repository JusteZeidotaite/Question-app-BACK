const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middleware/auth");
const {
  REGISTER,  
  LOGIN,
} = require("../controllers/user");

router.post("/register", REGISTER);
router.post("/login", LOGIN);


module.exports = router;