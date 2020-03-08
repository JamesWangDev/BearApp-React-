import mongoose from "mongoose";
import { RegistryI } from "./registry-types";

const RegistrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Registry title required"],
  },
  description: {
    type: String,
    required: [true, "Registry description required"],
  },
  tyMessage: {
    type: String,
  },
  p1FullName: {
    type: String,
    required: [true, "Registry p1FullName required"],
  },
  p2FullName: {
    type: String,
    required: [true, "Registry p2FullName required"],
  },
  weddingDate: {
    type: Date,
  },
  phoneNumber: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, "Registry email required"],
  },
  userId: {
    type: String,
    required: [true, "Registry userId required"],
  },
  customUrl: {
    type: String,
    required: [true, "Registry customUrl required"],
    unique: true,
    validate: {
      validator: (url: string) => url.split(" ").length === 1,
      message: () => "Registry customUrl cannot contain spaces",
    },
  },
  items: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Item",
    },
  ],
  coverImage: {
    type: String,
    default: "https://bit.ly/2Pr0xeQ",
  },
});

const Registry = mongoose.model<RegistryI>("Registry", RegistrySchema);

export default Registry;
