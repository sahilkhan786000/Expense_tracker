import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD; 


 const mongoDB = async() => {
    const DB_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.2yn8zsd.mongodb.net/email?retryWrites=true&w=majority`;;
   try{

   await mongoose.connect(DB_URL);
    console.log("connencted successfully");
}
   catch(error){

    console.log('Error while connecting with the database', error.message);

   }
}
export default mongoDB;
