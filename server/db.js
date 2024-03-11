import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();



 const mongoDB = async() => {
    const DB_URL = 'mongodb+srv://salmanengis6397:Sahilkhan%407860@cluster0.tzix6td.mongodb.net/transaction?retryWrites=true&w=majority&appName=Cluster0';
   try{

   await mongoose.connect(DB_URL);
    console.log("connencted successfully");
}
   catch(error){

    console.log('Error while connecting with the database', error.message);

   }
}
export default mongoDB;
