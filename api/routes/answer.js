const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  GET_ANSWERS_BY_QUESTION_ID,
  POST_ANSWER_BY_QUESTION_ID,
  DELETE_ANSWER_BY_ID,
} = require("../controllers/answer");

router.get("/question/:questionId/answers", GET_ANSWERS_BY_QUESTION_ID);
router.post("/question/:questionId/answers", authMiddleware, POST_ANSWER_BY_QUESTION_ID);
router.delete("/answer/:id", authMiddleware, DELETE_ANSWER_BY_ID);

module.exports = router;