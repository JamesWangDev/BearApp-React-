import { Router } from "express";
import ItemRoutes from "./Items";

const router = Router();

// Index Route -- /api
router.get("/", (_, res) => res.send("v16 Bears 4 API"));
router.use("/", ItemRoutes);

export default router;
