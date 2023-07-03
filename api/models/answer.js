const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  answerText: { type: String, required: true, min: 3 },
  gainedLikesNumber: { type: Number, required: false },
  id: { type: String, required: true, min: 3 },
  questionId: { type: String, required: true }
});

module.exports = mongoose.model("Answer", answerSchema);