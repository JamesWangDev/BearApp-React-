import { Router } from "express";
import { verifyToken, checkPaidUser, checkOwnership } from "../../middleware";
import {
  getEveryRegistry,
  createRegistry,
  getOneRegistry,
  updateOneRegistry,
  deleteOneRegistry,
  getMyRegistry,
} from "./registry-controllers";

const router = Router();

router.get("/", getEveryRegistry);
router.post("/", verifyToken, checkPaidUser, createRegistry);
router.get("/admin", verifyToken, getMyRegistry);
router.get("/:customUrl", getOneRegistry);
router.put("/:registryId", verifyToken, checkOwnership, updateOneRegistry);
router.delete("/:registryId", verifyToken, checkOwnership, deleteOneRegistry);

export default router;
