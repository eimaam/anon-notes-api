import { Router } from "express";
import { Request, Response } from "express";
import { UserController } from "../handlers/user";
import { ThreadController } from "../handlers/thread";
import { ReplyController } from "../handlers/replies";
import { validateCreateReply, validateThreadCreation, validateThreadUpdate } from "../middlewares/validators.middleware";

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
router.post("/thread", validateThreadCreation, ThreadController.create);
router.get("/thread/:threadId", ThreadController.getById);
router.get("/threads", ThreadController.getAll);
router.patch("/thread/:threadId", validateThreadUpdate, ThreadController.update);
router.delete("/thread/:threadId", ThreadController.delete);

// Replies
router.post("/reply", validateCreateReply, ReplyController.create);
router.get("/reply/:replyId", ReplyController.getById);
router.get("/replies", ReplyController.getAll);
router.get("/replies/thread/:threadId", ReplyController.getByThread);


export default router;
