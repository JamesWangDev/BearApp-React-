import { ItemI } from "../models/Item";
import { totalPurchased } from "./pricing";

export const structureItem = (item: ItemI) => ({
  _id: item._id,
  isReserved: item.isReserved,
  name: item.name,
  description: item.description,
  price: item.price,
  link: item.link,
  image: item.image,
  addedOn: item.addedOn,
  totalPurchased: totalPurchased(item.purchasers),
});
