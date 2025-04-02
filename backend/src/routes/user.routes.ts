import { Router } from "express";
import { Login, register } from "../controllers/user.controller";

const router = Router();

router.post('/signup', register)
router.post('/signin', Login)

export default router;

