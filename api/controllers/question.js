const QuestionModel = require("../models/question");
const UserModel = require("../models/user");
const uniqid = require("uniqid");

module.exports.INSERT_QUESTION = async (req, res) => {
  const question = new QuestionModel({
    id: uniqid(),
    creationDate: new Date(),
    questionText: req.body.questionText,
   
  });

  const savedQuestion = await question.save();

  UserModel.updateOne(
    { id: req.body.userId },
    { $push: {  askedQuestionsIds: savedQuestion.id } }
  ).exec();

  res.status(200).json({ response: savedQuestion });
};

module.exports.GET_ALL_QUESTIONS = async (req, res) => {
  const questionGroup = await QuestionModel.find();

  res.status(200).json({ questionGroup: questionGroup });
};

module.exports.DELETE_QUESTION_BY_ID = async (req, res) => {
  await QuestionModel.deleteOne({ id: req.params.id });
  res.status(200).json({ response: "Question was deleted" });
};