import asyncHandler from "express-async-handler";
import Message from "../models/Message";
import Question from "../models/Question";
import User from "../models/User";

const saveQuestion = asyncHandler(async (req, res, next) => {
  const { question, answers, account } = req.body;
  if (!question || !answers || !account) {
    res.status(401);
    throw new Error("Invalid request");
  }

  let qxn = await Question.create({
    twilio: account,
    question,
    possibleAnswers: answers,
  });

  if (!qxn) {
    res.status(400);
    throw new Error("Failed to create question");
  }

  res.status(200);
  res.json(qxn);
});

const updateQuestion = asyncHandler(async (req, res, next) => {
  const { question, answers, account, id } = req.body;
  if (!question || !answers || !account) {
    res.status(401);
    throw new Error("Invalid request");
  }

  let qxn = await Question.findById(id).update({
    question,
    possibleAnswers: answers,
  });

  if (!qxn) {
    res.status(400);
    throw new Error("Failed to create question");
  }

  res.status(200);
  res.json(qxn);
});

const getQuestions = asyncHandler(async (req, res, next) => {
  let questions = await Question.find({ sid: req.headers.sid });

  res.status(200);
  res.json(questions);
});

const getQuestion = asyncHandler(async (req, res, next) => {
  let question = await Question.findById(req.params.id);

  let replies = [];
  if (question) {
    replies = await Message.find({ reply: question.id });
  }

  res.status(200);
  res.json({ question, replies });
});

export { saveQuestion, getQuestions, getQuestion };
