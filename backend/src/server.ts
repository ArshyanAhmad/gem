import { connectDB } from "./config/db";
import { app } from "./app";

const PORT = Number(process.env.PORT!) || 8080;

connectDB().
    then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Database connection error: ", err);
    })


