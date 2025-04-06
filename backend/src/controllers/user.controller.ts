import { SignUpInput, SignInInput } from "../types/signup";
import { NextFunction, Request, Response } from "express";
import { Wallet } from "../models/wallet.models";
import { User } from "../models/user.models";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const success = SignUpInput.safeParse(req.body);

        if (!success.success) {
            const errorMessage = success.error.errors.map(err => err.message).join(", ") || "Invalid input";
            res.status(400).json({ error: errorMessage });
            return;
        }

        const { name, email, password, phone } = success.data;

        const userExist = await User.findOne({ email }).lean();

        if (userExist) {
            res.status(400).json({ error: "User already exists" });
            return;
        }

        const user = await User.create({ name, email, password, phone });

        const amount = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;

        await Wallet.create({
            userId: user._id,
            balance: 9000
        })

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY!, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,  // Prevents access from JavaScript (XSS protection)
            secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
            sameSite: "strict", // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.setHeader("Authorization", `Bearer ${token}`)

        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
};



export const Login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const success = SignInInput.safeParse(req.body);

    if (!success.success) {
        const errorMessage = success.error.errors.map(err => err.message).join(", ") || "Invalid input";
        res.status(400).json({ error: errorMessage });
        return;
    }

    const { email, password } = success.data;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            res.json({
                error: "Email not registered!"
            })
            return;
        }

        const isMatch = await user.isPasswordCorrect(password);

        if (!isMatch) {
            res.status(400).json({ error: "Invalid password!" });
            return;
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY!, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,  // Prevents access from JavaScript (XSS protection)
            secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
            sameSite: "strict", // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.setHeader("Authorization", `Bearer ${token}`)

        const userData = {
            username: user.name,
            userId: user._id
        }

        res.status(200).json({ token, userData });

    } catch (error: any) {
        console.error("Error while login", error.message);
        res.json({
            error: "Internal server error"
        })
        return;
    }

}


export const Logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // const userId = req.userId;
    } catch (error) {

    }
}  