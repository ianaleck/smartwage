import asyncHandler from "express-async-handler";
import { Twilio } from "twilio";

const testConnection = (req, res, next) => {
  const { sid } = req.body;
  const { token } = req.headers;
  if (!sid || !token) {
    res.status(403);
    throw new Error("sid, token are required");
  }

  try {
    const conn = new Twilio(sid, token as string);
    conn.availablePhoneNumbers
      .list((err, messages) => {
        if (err) {
          res.status(403);
          throw new Error(err.message);
        } else {
          req.body.sid = sid;
          req.body.token = token;
          next();
        }
      })
      .catch((err) => {
        res.status(403);
        throw new Error(err.message);
      });
  } catch (err: any) {
    res.status(403);
    throw new Error(err.message);
  }
};

export default testConnection;
