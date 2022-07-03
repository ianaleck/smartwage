import asyncHandler from "express-async-handler";
import Message from "../models/Message";
import Question from "../models/Question";
import User from "../models/User";

const getUsers = asyncHandler(async (req, res, next) => {
  let users = await User.find({ sid: req.headers.sid });

  res.status(200);
  res.json(users);
});

const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let user = await User.findById(id);
  let questions: any = [];

  if (user) {
    let qxns: any = await Question.find({ sid: user.sid });
    for (let i = 0; i < qxns.length; i++) {
      let answer = await Message.findOne({
        reply: qxns[i].id,
        from: user.number,
      });
      questions.push({ qxn: qxns[i], answer });
    }
  }

  res.status(200);
  res.json({ user, questions });
});

export { getUsers, getUser };
