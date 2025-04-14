import { Router } from "express";
import { Login, register, searchByName } from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuth";

const router = Router();

router.post('/signup', register)
router.post('/signin', Login)
router.post('/search', isAuthenticated, searchByName)
// router.get('/all-users', isAuthenticated, getAllUsers)

export default router;

