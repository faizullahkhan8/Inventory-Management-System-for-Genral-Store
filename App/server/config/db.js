// database.js
import mongoose from "mongoose";

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000; // 5 seconds

let attempts = 0;

const connectDB = async () => {
    try {
        attempts++;
        console.log(`🔄 Attempt ${attempts} to connect MongoDB...`);

        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error(
            `❌ Connection Failed (Attempt ${attempts}): ${error.message}`
        );

        if (attempts < MAX_RETRIES) {
            console.log(`⏳ Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
            setTimeout(connectDB, RETRY_INTERVAL);
        } else {
            console.error(
                "🚫 Could not connect to MongoDB after multiple attempts."
            );
        }
    }
};

export default connectDB;
