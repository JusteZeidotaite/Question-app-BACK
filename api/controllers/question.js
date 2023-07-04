const QuestionModel = require("../models/question");
const UserModel = require("../models/user");
const uniqid = require("uniqid");

const jwt = require("jsonwebtoken");

module.exports.INSERT_QUESTION = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const question = new QuestionModel({
      id: uniqid(),
      creationDate: new Date(),
      questionText: req.body.questionText,
      answersIds: [],
      userId: userId
    });

    const savedQuestion = await question.save();

    UserModel.updateOne({ id: userId }, { $push: { askedQuestionsIds: savedQuestion.id } }).exec();

    res.status(200).json({ response: savedQuestion });
  } catch (error) {
    console.error("Error inserting question:", error);
    res.status(401).json({ response: "Unauthorized: Invalid token" });
  }
};

module.exports.GET_ALL_QUESTIONS = async (req, res) => {
  const questionGroup = await QuestionModel.find();

  res.status(200).json({ questionGroup: questionGroup });
};

module.exports.GET_QUESTION_BY_ID = async (req, res) => {
  const question = await QuestionModel.find({ id: req.params.id });
  res.status(200).json({ response: question });
};

module.exports.DELETE_QUESTION_BY_ID = async (req, res) => {
  await QuestionModel.deleteOne({ id: req.params.id });
  res.status(200).json({ response: "Question was deleted" });
};