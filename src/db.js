import mongoose from "mongoose"; 
import {DB_URL} from "./config.js"

export const connectDB = async () => {
    console.log("Probando a conectar a la BD");
    
    try {
       // await mongoose.connect("mongodb://127.0.0.1:27017/mern_db");
        await mongoose.connect(DB_URL);
        console.log("Database connected");

    } catch (error) {
        console.log(error.message);

    }

};


