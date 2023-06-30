const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  GET_ANSWERS_BY_QUESTION_ID,
  POST_ANSWER_BY_GROUP_ID,
  DELETE_ANSWER_BY_ID,
} = require("../controllers/answer");

router.get("/question/:id/answers", authMiddleware, GET_ANSWERS_BY_QUESTION_ID);
router.post("/question/:id/answers", authMiddleware, POST_ANSWER_BY_GROUP_ID);
router.delete("/group/:id", authMiddleware, DELETE_ANSWER_BY_ID);

module.exports = router;