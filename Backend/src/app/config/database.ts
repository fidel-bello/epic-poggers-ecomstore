import config from 'config';
import mongoose from 'mongoose';

const URI: string = config.get('URI');

export  async function connectDB() {
    
    try {
        await mongoose.connect(URI);
        console.log('Connection to database: successful');
    } catch (err) {
        console.error('Connection failed', err);
        process.exit(1);
    }
}