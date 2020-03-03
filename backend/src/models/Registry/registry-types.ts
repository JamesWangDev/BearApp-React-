import { Document } from "mongoose";

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
  items: string[];
  coverImage: string;
}
