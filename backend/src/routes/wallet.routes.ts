import { Router } from "express";
import { addMoney, getUserBalance, transferMoney } from "../controllers/wallet.controller";
import { isAuthenticated } from "../middlewares/isAuth";

const router = Router();

router.post("/add", isAuthenticated, addMoney);
router.post("/transfer", isAuthenticated, transferMoney);

router.get("/balance/:userId", isAuthenticated, getUserBalance);

export default router;