import mongoose from "mongoose";
import { ItemI } from "./item-types";

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name required"],
  },
  description: {
    type: String,
    required: [true, "Item description required"],
  },
  price: {
    type: Number,
    required: [true, "Item price required"],
    min: 0,
  },
  link: {
    type: String,
  },
  image: {
    type: String,
  },
  isPurchased: {
    type: Boolean,
    default: false,
  },
  isReserved: {
    type: Boolean,
    default: false,
  },
  addedOn: {
    type: Date,
    default: Date.now,
  },
  reservedOn: {
    type: Date,
  },
  purchasedOn: {
    type: Date,
  },
});

const Item = mongoose.model<ItemI>("Item", ItemSchema);

export default Item;
