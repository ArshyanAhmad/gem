import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs"


interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    wallet?: mongoose.Schema.Types.ObjectId;
    isPasswordCorrect(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
    }
},
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const hashedPassword = await bcryptjs.hash(this.password, 10);
        this.password = hashedPassword;
        next();

    } catch (error: any) {
        next(error);
    }
})

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    try {
        return await bcryptjs.compare(password, this.password);
    } catch (error) {
        console.error("Error while comparing passwords:", error);
        return false;
    }
}

export const User = mongoose.model("User", userSchema);











