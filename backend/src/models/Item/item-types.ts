import { Document } from "mongoose";

export interface ItemI extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  link?: string;
  image?: string;
  isPurchased?: boolean;
  isReserved?: boolean;
  addedOn?: Date;
  reservedOn?: Date;
  purchasedOn?: Date;
}

export const validItem = {
  name: "Honda Civic",
  description: "We want a new car!",
  price: 20000,
};

export const invalidItem = {
  name: "Honda Civic",
  price: -1,
};
