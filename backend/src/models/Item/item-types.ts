import { Document } from "mongoose";

export interface ItemI extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  link?: string;
  image?: string;
  isReserved?: boolean;
  addedOn?: Date;
  reservedOn?: Date;
  purchasers?: {
    name?: string;
    email?: string;
    message?: string;
    purchasedOn: Date;
    pricePaid: number;
  }[];
}
