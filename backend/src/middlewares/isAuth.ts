import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId?: string | undefined;
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ error: "User not authorized. Token missing." });
            return;
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            res.json({
                error: "Token not provided"
            })
            return;
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { id: string };

        if (!decoded) {
            res.status(401).json({ error: "Invalid token." });
            return;
        }

        req.userId = decoded.id

        next()

    } catch (error: any) {
        console.error(error.message);

        res.json({
            error: "Invalid or expired token"
        })

        return;
    }
}