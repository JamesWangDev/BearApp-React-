import mongoose from "mongoose";
//import { ItemI } from "./item-types";

const RegistrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Registry title required"],
  },
  description: {
    type: String,
    required: [true, "Registry description required"],
  },
  tyMessage : {
      type: String,
  },
  p1FullName : {
    type: String,
    required: [true, "Partner 1 full Name required"],
  },
  p2FullName : {
    type: String,
    required: [true, "Partner 2 full Name required"],
  },
  weddingDate : {
      type: Date,
  },
  phoneNumber : {
      type: Number,
  },
  email : {
      type: String,
      required: [true, "Email is required"],
  },
  userId: {
      type: String,
      required: [true, "UserId is required"],
  },
  customUrl: {
      type: String,
      required: [true, "Custom URL is required"],
      unique: true
  },
  items : [{
      type: mongoose.Types.ObjectId,
      ref: "Item"
  }],
  coverImage: {
      type: String,
      default: "https://bit.ly/2Pr0xeQ"
  }
});

const Registry = mongoose.model("Registry", RegistrySchema);

export default Registry;
