import mongoose, { Document } from "mongoose";
const accountSchema = new mongoose.Schema(
  {
    sid: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "account",
  }
) as any;
const Account = mongoose.model("Account", accountSchema);
export default Account;