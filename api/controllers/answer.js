const QuestionModel = require("../models/question");
const AnswerModel = require("../models/answer");
const uniqid = require("uniqid");



module.exports.POST_ANSWER_BY_QUESTION_ID = async (req, res) => {
  const answer = new AnswerModel({
    id: uniqid(),
    answerText: req.body.answerText,
    gainedLikesNumber: req.body.gainedLikesNumber,
    questionId: req.body.questionId
  });

  const savedAnswer = await answer.save();

  const updatedQuestion = await QuestionModel.findOneAndUpdate(
    { id: req.body.questionId },
    { $push: { answersIds: savedAnswer.id } },
    { new: true } 
  ).exec();

  res.status(200).json({ response: updatedQuestion });
};




module.exports.GET_ANSWERS_BY_QUESTION_ID = async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const aggregatedQuestionsData = await QuestionModel.aggregate([
      {
        $match: { id: questionId },
      },
      {
        $lookup: {
          from: "answers",
          localField: "answersIds",
          foreignField: "id",
          as: "question_answers",
        },
      },
    ]).exec();

    res.status(200).json({ response: aggregatedQuestionsData });
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({ response: "Internal server error" });
  }
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