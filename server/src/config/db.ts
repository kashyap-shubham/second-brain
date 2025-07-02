import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


class Database {
    #connectionString: string;
    #isConnected: boolean = false;

    
    constructor(dbConnectionUrl?: string) {
        const connectionString = dbConnectionUrl || process.env.DB_URL;
       
        if (!connectionString) {
            throw new Error("Database Connection String is required");
        }

        this.#connectionString = connectionString;
    }


    async connect(): Promise<void> {
        if (this.#isConnected) {
            console.log("Already connected to the database");
            return;
        } 

        try {
            await mongoose.connect(this.#connectionString);
            this.#isConnected = true;
            console.log("Database Connected Successfully.");

        } catch(error) {
            if (error instanceof Error){
                console.error("Database Connection failed: ", error.message);
            } else {
                console.error("Database Connection failed: ", error);
            }
            process.exit(1);
        }
    }


    async disconnect(): Promise<void> {
        if (!this.#isConnected) {
            console.log("Database is not Connected");
            return;
        }

        try {
            await mongoose.disconnect();
            this.#isConnected = false;
            console.log("Database is Disconnected Successfully");

        } catch(error) {
            if (error instanceof Error){
                console.error("Error during disconnection: ", error.message);
            } else {
                console.error("Error during disconnection: ", error);
            }
        }
    }


    isConnected(): boolean {
        return this.#isConnected;
    }


    getConnectionString(): string {
        return this.#connectionString;
    }

}

export const database = new Database();