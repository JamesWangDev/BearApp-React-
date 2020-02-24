import { Router } from "express";
import * as Item from "./items-controllers";

const router = Router();

router.get("/items", Item.getEveryItem);
router.post("/item", Item.createItem);
router.get("/item/:itemId", Item.getOneItem);
router.put("/item/:itemId", Item.updateOneItem);
router.delete("/item/:itemId", Item.deleteOneItem);
router.get("/item/:registryId", Item.getRegistryItems); // not tested
router.delete("/item/:registryId", Item.deleteRegistryItems); // not tested

export default router;
