import { Router } from "express";
import useAuth from "../middleware/auth.middleware";
import { createComment, getComment, getComments } from "../controller/comment.controller";

const router = Router()


router.post("/", useAuth, createComment)
router.get("/", getComments)
router.get("/:commentId", getComment)

export default router