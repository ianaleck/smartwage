import asyncHandler from "express-async-handler";
import { Twilio } from "twilio";
import Account from "../models/Account";

const connectAccount = asyncHandler(async (req, res, next) => {
  const { sid, token, from } = req.body;

  if (!from) {
    res.status(403);
    throw new Error("WhatsApp from required");
  }

  if (!from.startsWith("whatsapp:")) {
    res.status(403);
    throw new Error("WhatsApp source required, format whatsapp:+123456789");
  }

  let account = await Account.findOne({ sid, token });

  if (!account) {
    account = await Account.create({ sid, token, number: from });
  }

  res.json({ account });
});
export { connectAccount };
