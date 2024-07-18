import { Router } from "express";
import { Request, Response } from "express";
import { UserController } from "../handlers/user";
import { ThreadController } from "../handlers/thread";
import { ReplyController } from "../handlers/replies";

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

// Thread
router.post("/thread", ThreadController.create);
router.get("/thread/:threadId", ThreadController.getById);
router.get("/threads", ThreadController.getAll);
router.patch("/thread/:threadId", ThreadController.update);
router.delete("/thread/:threadId", ThreadController.delete);

// Replies
router.post("/reply", ReplyController.create);


export default router;
