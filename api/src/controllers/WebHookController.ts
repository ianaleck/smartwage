import asyncHandler from "express-async-handler";
import { sendMessage } from "../config/twilio";
import Account from "../models/Account";
import Message from "../models/Message";
import Question from "../models/Question";
import User from "../models/User";

const receiveMessages = asyncHandler(async (req, res, next) => {
  const { AccountSid, From, Body, NumMedia, To } = req.body;

  //validate required parameters
  if (!AccountSid || !From || !Body || !NumMedia || !To) {
    res.status(403);
    throw new Error(`Invalid AccountSid`);
  }

  //check if SID exists
  let account: any = await Account.findOne({ sid: AccountSid });
  if (!account) {
    res.status(404);
    throw new Error(`Account not registered`);
  }

  //check if user exists or create one
  let user = await User.findOne({ number: From, sid: AccountSid });
  if (!user) {
    user = await User.create({ number: From, sid: AccountSid });
    //check if the user has a name
    sendMessage(
      AccountSid,
      account.token,
      account.number,
      "*Welcome to my app*,\nMy name is Ian\n\nWhat is your name",
      From
    );
    res.status(200);
    res.json({ complete: true });
    return;
  }

  let bodyString: string = Body;

  //check if user has name
  if (!user.name) {
    let res = await User.findByIdAndUpdate(user._id, { name: bodyString });
  }

  //check if user is replying to message
  if (user.currentQuestion) {
    let question: any = await Question.findOne({ id: user.currentQuestion });
    if (question) {
      //get possible answers and attempt to convert answer from numeric to string value
      let answers: string[] = question.possibleAnswers;
      if (
        answers.length > 0 &&
        !isNaN(Body) &&
        Body < answers.length &&
        Body > 0
      ) {
        bodyString = answers[Body - 1];
      }
    }
  }
  //create message in database

  const message = await Message.create({
    twilio: account.id,
    from: From,
    fromMe: 0,
    to: To,
    body: bodyString,
    mediaUrl: req.body?.MediaUrl0 || "",
    reply: user.currentQuestion || "",
  });
  //TODO send socket message to anyone listening
  let questions = await Question.find({ twilio: account.id });
  //check if user has answered question already
  for (let i = 0; i < questions.length; i++) {
    let answer = await Message.findOne({
      twilio: account.id,
      from: user.number,
      reply: questions[i].id,
    });
    if (!answer) {
      //send new question
      await user.updateOne({
        currentQuestion: questions[i].id,
      });
      let qxn = `*${questions[i].question}*`;
      let answers: any = questions[i]?.possibleAnswers;
      if (answers instanceof Array) {
        answers.map((ans: any, i) => {
          qxn += `\n*${i + 1}.* ${ans}`;
        });
      }
      await sendMessage(AccountSid, account.token, account.number, qxn, From);
      res.status(200);
      res.json({ complete: true });
      return;
    }
  }

  //get latest date
  await user.updateOne({
    currentQuestion: "",
  });
  await sendMessage(
    AccountSid,
    account.token,
    account.number,
    "Ive run out of questions at the moment",
    From
  );
  res.status(200);
  res.json({ complete: true });
});

export default receiveMessages;
