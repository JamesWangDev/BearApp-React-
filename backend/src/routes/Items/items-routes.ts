import { Router } from "express";
import { verifyToken, checkPaidUser, checkOwnership } from "../../middleware";
import {
  getEveryItem,
  getOneItem,
  updateOneItem,
  deleteOneItem,
  createItem,
  deleteMultipleItems,
  madeItemPurchase,
} from "./items-controllers";

const router = Router();

router.get("/all", getEveryItem);
router
  .route("/:itemId")
  .get(getOneItem)
  .post(madeItemPurchase);
router
  .route("/:itemId/registry/:registryId")
  .put(verifyToken, checkOwnership, updateOneItem)
  .delete(verifyToken, checkOwnership, deleteOneItem);
router
  .route("/registry/:registryId")
  .post(verifyToken, checkPaidUser, createItem)
  .delete(verifyToken, checkOwnership, deleteMultipleItems);

export default router;
