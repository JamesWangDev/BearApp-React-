import { PurchaserI } from "../models/Item/item-types";

export const totalPurchased = (purchasers: PurchaserI[] | undefined) => {
  if (!purchasers) return 0;

  return purchasers.reduce(
    (total: number, purchaser: PurchaserI) => total + purchaser.pricePaid,
    0
  );
};
