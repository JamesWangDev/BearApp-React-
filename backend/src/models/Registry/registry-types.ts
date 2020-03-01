import { Document } from "mongoose";
import { ItemI } from "../Item";

export interface RegistryI extends Document {
  title: string;
  description: string;
  tyMessage?: string;
  p1FullName: string;
  p2FullName: string;
  weddingDate?: Date;
  phoneNumber?: number;
  email: string;
  userId: string;
  customUrl: string;
  items: ItemI[];
  coverImage: string;
}
