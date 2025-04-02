import mongoose, { Document, Schema } from "mongoose";

// Define the Transaction interface
interface ITransaction extends Document {
    sender: mongoose.Schema.Types.ObjectId;
    senderPhone: string;
    receiver: mongoose.Schema.Types.ObjectId;
    receiverPhone: string;
    amount: number;
    status: "Success" | "Failed" | "Pending";
    transactionType: "Send" | "Receive";
    createdAt: Date;
}

// Define the schema
const transactionSchema = new Schema<ITransaction>({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    senderPhone: {
        type: String,
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverPhone: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Success", "Failed", "Pending"],
        default: "Pending",
    },
    transactionType: {
        type: String,
        enum: ["Send", "Receive"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the model with correct types
export const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema);
