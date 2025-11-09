import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URL = process.env.MONGO_URI || '';
console.log('MONGO_URL', MONGO_URL);
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('✅ Connected to MongoDB');
    }
    catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('✅ Disconnected from MongoDB');
    }
    catch (error) {
        console.error('❌ Error disconnecting from MongoDB:', error);
    }
};
//# sourceMappingURL=db.js.map