import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { getUsers, getUser, updateUser, deleteUser } from "../controller/user.controller";

const router = Router();

router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
