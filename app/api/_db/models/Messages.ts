import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },

  timestamp: {
    type: String,
    required: true,
  },
});
export const Message =
  mongoose.models.Message ||
  mongoose.model("Message", MessageSchema, "messages");
