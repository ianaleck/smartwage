import asyncHandler from "express-async-handler";
import { Twilio } from "twilio";
import Account from "../models/Account";

const verifySID = asyncHandler(async (req, res, next) => {
  const { sid } = req.headers;
  if (!sid) {
    res.status(403);
    throw new Error("sid is required");
  }

  let account: any = await Account.findOne({ sid });
  if (account) {
    req.body.account = account._id;
    next();
  } else {
    res.status(403);
    throw new Error("account not found");
  }
});

export default verifySID;
