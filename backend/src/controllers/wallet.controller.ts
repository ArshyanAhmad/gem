import { Request, Response, NextFunction } from "express";
import { Wallet } from "../models/wallet.models";
import { User } from "../models/user.models";

// Wallet Balance	        /api/wallet/balance/:userId	        GET	    Get user wallet balance
// Add Money	            /api/wallet/add	                    POST	Add money to wallet
// Withdraw Money	        /api/wallet/withdraw	            POST	Withdraw money to bank
// Send Money	            /api/wallet/transfer	            POST	Transfer money to another user
// Transaction History	    /api/wallet/transactions/:userId	GET   	Get user's transaction history



export const addMoney = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const { amount } = req.body;

        if (typeof amount !== "number" || isNaN(amount)) {
            res.status(400).json({ error: "Invalid amount. Please enter a valid number." });
            return;
        }

        const userId = req.userId;

        if (!userId) {
            res.status(400).json({ error: "User ID is missing in request" });
            return;
        }

        const userWallet = await Wallet.findOne({ userId });

        if (!userWallet) {
            res.status(404).json({ error: "Wallet not found for this user" });
            return;
        }

        userWallet.balance += amount;
        await userWallet.save();

        res.status(200).json({
            userId,
            balance: userWallet.balance
        })

        return;

    } catch (error: any) {
        console.error("Error while adding money, ", error.message);

        res.json({
            error: "Internal server error"
        })
        return;
    }
}


export const transferMoney = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const { phone, amount } = req.body;

    try {

    } catch (error) {

    }
}


export const getUserBalance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const userId = req.userId;
        if (!userId) {
            res.status(400).json({ error: "User ID is missing in request" });
            return;
        }

        const [user, userWallet] = await Promise.all([
            User.findById(userId),
            Wallet.findOne({ userId })
        ]);

        if (!user) {
            res.status(404).json({ error: "User not found or invalid ID" });
            return;
        }

        if (!userWallet) {
            res.status(404).json({ error: "Wallet not found for this user" });
            return;
        }

        res.json({
            userId,
            name: user?.name,
            balance: userWallet?.balance
        })

        return;

    } catch (error: any) {
        console.error("Error fetching user wallet:", error.message);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}

