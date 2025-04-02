import { connectDB } from "./config/db";
import { app } from "./app";

const PORT = process.env.PORT! || 8080;

connectDB().
    then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port at ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("Database connection error: ", err);
    })


