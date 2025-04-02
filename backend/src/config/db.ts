import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI!}/paygem`);

        mongoose.connection.on("connected", () => {
            console.log("Mongoose is connected to the database");
        })

        mongoose.connection.on("error", (err) => {
            console.log("Mongoose connection error: ", err);
        })

        mongoose.connection.on("disconnected", () => {
            console.log("Mongoose disconnected!");
        });

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

