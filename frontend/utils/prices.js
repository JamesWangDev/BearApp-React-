export const getTotalPricePaid = purchasers =>
  purchasers.reduce((acc, { pricePaid }) => acc + pricePaid, 0);
