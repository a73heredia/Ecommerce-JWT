import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
export const init = async () =>  {
    try {
        const URI = process.env.MONGO_URI;
        await mongoose
            .set('strictQuery', true)
            .connect(URI);
        console.log('Database Connected');
    } catch (error) {
        console.log(error.message);
    }
}

