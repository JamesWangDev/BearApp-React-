import { Router } from "express";
// import new route files below
// import itemRoutes from "./items";

const router = Router();

router.get("/", (_, res) => res.send("v16 Bears 4 API"));
// remember the endpoint already contains /api ...
// ... so itemRoutes endpoint would be /api/item
// router.use("/item", itemRoutes);

export default router;
