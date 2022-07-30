import app from './src/app';
import mongoose from 'mongoose';
import config from './src/config';

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URL);
        console.log('DB connected');
    } catch (error) {
        throw error;
    }
};
connectDB();
mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!');
});
