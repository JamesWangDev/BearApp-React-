import { Router } from "express";
import * as Item from "./items-controllers";

const router = Router();

router.get("/all", Item.getEveryItem);
router.get("/:itemId", Item.getOneItem);
router.put("/:itemId", Item.updateOneItem); // isOwner _ isAdmin
router.delete("/:itemId/registry/:registryId", Item.deleteOneItem); // isOwner _ isAdmin
router.post("/registry/:registryId", Item.createItem); // isUser
router.delete("/registry/:registryId", Item.deleteMultipleItems); // isOwner _ isAdmin

export default router;
