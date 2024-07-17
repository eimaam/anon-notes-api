import { Router } from "express";
import { Request, Response } from "express";
import { UserController } from "../handlers/user";

const router = Router();

router.get("/healthcheck", (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "API is running" });
});

// user routes
router.post("/user", UserController.create);
router.get("/user/:userId", UserController.getById);
router.get("/users", UserController.getAll);
router.patch("/user/:userId", UserController.update);
router.delete("/user/:userId", UserController.delete);

export default router;
