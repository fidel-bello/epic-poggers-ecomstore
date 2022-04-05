import mongoose from 'mongoose';

export class Database
{
    private URL: string;

    constructor(url: string){
        this.URL = url;
    }

    public set url(url: string) {
        this.URL = url;
    }

    public get url(): string {
        return this.URL;
    }

    

    public async connectionMongo(): Promise<void>{
        try {
            await mongoose.connect(this.URL) 
            console.log('Connection Succesfull');
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
        
    };
}