import { Router } from "express";
import * as Registry from "./registry-controllers";

const router = Router();

router.get("/", Registry.getEveryRegistry);
router.post("/", Registry.createRegistry);
router.get("/:customUrl", Registry.getOneRegistry);
router.put("/:registryId", Registry.updateOneRegistry);
router.delete("/:registryId", Registry.deleteOneRegistry);

export default router;
