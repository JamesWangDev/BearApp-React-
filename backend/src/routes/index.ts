import { Router } from "express";
import * as Item from "./items";

const router = Router();

// Index Route -- /api
router.get("/", (_, res) => res.send("v16 Bears 4 API"));

// Item Routes - middlewares needed for some routes after the path
router.get("/items", Item.getEveryItem);
router.post("/item", Item.createItem);
router.get("/item/:itemId", Item.getOneItem);
router.put("/item/:itemId", Item.updateOneItem);
router.delete("/item/:itemId", Item.deleteOneItem);
router.get("/item/:registryId", Item.getRegistryItems);
router.delete("/item/:registryId", Item.deleteRegistryItems);

export default router;
