import { Request, Response, NextFunction } from "express";
import { Wallet } from "../models/wallet.models";
import { User } from "../models/user.models";
import mongoose from "mongoose";

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


// user 1 = sadjldkfnmdsfjiodsflsdf;
// user 2 = dfjdl;fmdskjfldsfmdsfsdf;

// userSchema = {
//     name,
//     email,
//     phone,
//     password,
//     wallet : mongoose Object
// }

// walletSchema = {
//     userId,
//     balance,
//     transactions : mongoose Object
// }


export const transferMoney = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const session = await mongoose.startSession();
    session.startTransaction();

    const { phone, amount } = req.body;

    try {
        const userId = req.userId;

        const sender = await User.findById(userId)
        const receiver = await User.findOne({ phone });

        if (!receiver) {
            await session.abortTransaction();
            res.json({
                error: "Invalid phone no, user doesn't exists"
            })
            return;
        }

        const isMatch = sender?.phone === phone;
        if (isMatch) {
            await session.abortTransaction();
            res.json({
                error: "Phone number cannot be the same as the sender's"
            })
            return;
        }

        const senderAccount = await Wallet.findOne({ userId: req.userId }).session(session);

        if (!senderAccount || senderAccount?.balance < amount) {
            await session.abortTransaction();
            res.status(400).json({
                message: "Insufficient balance",
            });
            return;
        }

        const receiverAccount = await Wallet.findOne({ userId: receiver?._id }).session(session);

        if (!receiverAccount) {
            await session.abortTransaction();
            res.json({
                error: "Receiver wallet not found"
            })
            return;
        }

        await Wallet.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        ).session(session);

        await Wallet.updateOne(
            { userId: receiver._id },
            { $inc: { balance: amount } }
        ).session(session);

        await session.commitTransaction();

        res.json({
            message: "Money transfer successfull",
        })
        return;

    } catch (error: any) {
        await session.abortTransaction();
        console.error("Money transfer failed!", error.message);
        res.json({
            error: "Internal server error"
        })
        return;
    }
}


export const getUserBalance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const userId = req.query?.userId;

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

