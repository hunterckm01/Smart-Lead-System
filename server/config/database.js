import mongoose from "mongoose";

export default async function connectDB(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log('DB Connected Successfully');
    }
    catch(err){
        console.log('DB Connection Failed');
        console.error(err);
        process.exit(1);
    }
}