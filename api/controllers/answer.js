const QuestionModel = require("../models/question");
const AnswerModel = require("../models/answer");
const uniqid = require("uniqid");



module.exports.POST_ANSWER_BY_QUESTION_ID = async (req, res) => {
  const answer = new AnswerModel({
    id: uniqid(),
    answerText: req.body.answerText,
    gainedLikesNumber: req.body.gainedLikesNumber
  });

  const savedAnswer = await answer.save();

  QuestionModel.updateOne(
    { id: req.body.questionId },
    { $push: { answersIds: savedAnswer.id } }
  ).exec();

  res.status(200).json({ response: savedAnswer });
};




module.exports.GET_ANSWERS_BY_QUESTION_ID = async (req, res) => {
  const aggregatedQuestionsData = await QuestionModel.aggregate([
    {
      $lookup: {
        from: "answers",
        localField: "answersIds",
        foreignField: "id",
        as: "question_answers",
      },
    },
    { $match: { id: req.params.questionId } },
  ]).exec();

  res.status(200).json({ response: aggregatedQuestionsData });
};

module.exports.DELETE_ANSWER_BY_ID = async (req, res) => {
  const answerId = req.params.id;

  const question = await QuestionModel.findOne({ answersIds: answerId });

  if (!question) {
    return res.status(404).json({ response: "Question not found" });
  }

  await AnswerModel.deleteOne({ id: answerId });

 
  await QuestionModel.updateOne(
    { _id: question._id },
    { $pull: { answersIds: answerId } }
  ).exec();

  res.status(200).json({ response: "Answer was deleted" });
};