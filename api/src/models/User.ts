import mongoose, { Document } from "mongoose";
import { ObjectId } from "mongodb";
const userSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
    },
    sid: {
      type: String,
      required: true,
    },
    currentQuestion: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "user",
  }
);
const User = mongoose.model("User", userSchema);
export default User;
