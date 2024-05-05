import { Router } from "express";
import { addPost, deletePost, getPost, getPosts } from "../controller/post.controller";
import { verifyToken } from "../middleware/verifyToken";
const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost);
//router.put(":id", updatePost); // Soon
router.delete("/:id", verifyToken, deletePost);

export default router;
