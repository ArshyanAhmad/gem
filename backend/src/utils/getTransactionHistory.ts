import { Transaction } from "../models/transaction.models";

// Function to get transaction history for a user
export const getTransactionHistory = async ({
    userId,
    startDate,
    endDate,
    minAmount,
    maxAmount,
}: {
    userId: string;
    startDate: Date;
    endDate: Date;
    minAmount: number;
    maxAmount: number;
}) => {
    try {
        const transactions = await Transaction.find({
            $or: [{ sender: userId }, { receiver: userId }],
            createdAt: { $gte: startDate, $lte: endDate },
            amount: { $gte: minAmount, $lte: maxAmount },
        }).sort({ createdAt: -1 });

        return transactions; // Should return an array of ITransaction objects
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw new Error("Failed to fetch transactions");
    }
};
