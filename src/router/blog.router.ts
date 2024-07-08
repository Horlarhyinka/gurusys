import { Router } from "express";
import useAuth from "../middleware/auth.middleware";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../controller/blog.controller";
import idparamMiddleware from "../middleware/idparam.middleware";


const router = Router()

router.post("/", useAuth, createBlog)
router.get("/", getBlogs)
router.get("/:blogId", idparamMiddleware, getBlog)
router.put("/:blogId", idparamMiddleware, useAuth, updateBlog)
router.delete("/:blogId", idparamMiddleware, useAuth, deleteBlog)

export default router;