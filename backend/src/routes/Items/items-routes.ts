import { Router } from "express";
import { verifyToken, checkOwnership } from "../../middleware";
import {
  getEveryItem,
  getOneItem,
  updateOneItem,
  deleteOneItem,
  createItem,
  addPurchase,
  deleteMultipleItems,
  madeItemPurchase,
  getItemsByRegistry,
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
  .get(verifyToken, checkOwnership, getItemsByRegistry)
  .post(verifyToken, createItem)
  .delete(verifyToken, checkOwnership, deleteMultipleItems);
router.route("/:itemId/registry/:registryId/purchase").put(addPurchase);

export default router;
