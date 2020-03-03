import { Router } from "express";
import * as Registry from "./registry-controllers";
//import { requireAuth } from "../../server/app";

const router = Router();

router.get("/", Registry.getEveryRegistry);
router.post("/", Registry.createRegistry); // isUser
router.get("/:customUrl", Registry.getOneRegistry);
router.put("/:registryId", Registry.updateOneRegistry); // isOwner _ isAdmin
router.delete("/:registryId", Registry.deleteOneRegistry); // isOwner _ isAdmin

export default router;
