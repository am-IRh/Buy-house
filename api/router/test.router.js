import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controller/test.controller";

const router = new Router();

router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn);
router.get("/should-be-admin", shouldBeAdmin);

export default router;