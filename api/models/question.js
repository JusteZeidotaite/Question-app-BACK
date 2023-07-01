const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  creationDate: { type: String, required: true },
  questionText: { type: String, required: true },
  answersIds: { type: Array, required: true },
  id: { type: String, required: true, min: 3 },
  
});

module.exports = mongoose.model("Question", questionSchema);