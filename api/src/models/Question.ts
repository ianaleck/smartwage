import { ObjectId } from "mongodb";
import mongoose, { Document } from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    twilio: {
      type: ObjectId,
      ref: "account",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    possibleAnswers: {
      type: String,
      get: function (data: string) {
        try {
          return JSON.parse(data);
        } catch (err) {
          return data;
        }
      },
      set: function (data: string[]) {
        return JSON.stringify(data);
      },
      default: "[]",
    },
  },
  {
    timestamps: true,
    collection: "question",
  }
);
const Question = mongoose.model("Question", questionSchema);
export default Question;
