import {Router} from "express";
import { registerUser,signUser,resetPass } from "../controllers/user.js";
const router=Router();
router.post("/sign-up",registerUser);
router.post("/sign-in",signUser);
router.patch("/reset-pass",resetPass);
export default router;