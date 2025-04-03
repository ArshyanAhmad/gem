import { Router } from "express";
import { addMoney, getUserBalance, getTransactionsHistory, transferMoney } from "../controllers/wallet.controller";
import { isAuthenticated } from "../middlewares/isAuth";

const router = Router();

router.post("/add", isAuthenticated, addMoney);
router.post("/transfer", isAuthenticated, transferMoney);

router.get("/balance/:userId", isAuthenticated, getUserBalance);
router.get("/transactions/:userId", isAuthenticated, getTransactionsHistory);

export default router;