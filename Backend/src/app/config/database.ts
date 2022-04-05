import mongoose from 'mongoose';
import config from 'config';

export class Database
{
    private URL: string = config.get('URI');

    constructor(){
        this.URL =this.URL;
    }

    public async connectionMongo(): Promise<void>{
        try {
            await mongoose.connect(this.URL);
            console.log('Connection Succesfull');
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
        
    };
}