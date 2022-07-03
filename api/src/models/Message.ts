import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    twilio: {
      type: String,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    fromMe: {
      type: Number,
      default: 1,
    },
    body: {
      type: String,
    },
    mediaUrl: {
      type: String,
    },
    reply: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "message",
  }
);
const Message = mongoose.model("Message", messageSchema);
export default Message;
