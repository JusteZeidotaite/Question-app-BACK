const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  INSERT_QUESTION,
  GET_QUESTION_BY_ID,
  GET_ALL_QUESTIONS,
  DELETE_QUESTION_BY_ID
  
} = require("../controllers/question");

router.post("/question", authMiddleware, INSERT_QUESTION);
router.get("/question/:id",  GET_QUESTION_BY_ID);
router.get("/questions",  GET_ALL_QUESTIONS);
router.delete("/questions/:id", authMiddleware, DELETE_QUESTION_BY_ID);


module.exports = router;