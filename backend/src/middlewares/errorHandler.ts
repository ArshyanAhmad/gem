import { Request, Response, NextFunction } from "express";

interface ErrorResponse extends Error {
    status?: number;
}

export const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction): void => {
    console.error("Error:", err.message);

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
