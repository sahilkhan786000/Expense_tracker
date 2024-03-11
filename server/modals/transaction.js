
import mongoose from "mongoose";

const {Schema} = mongoose;  

const transactionSchema = new Schema({

    firstname : {
        type: String,
        required: true

    },

    lastname : {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },

    income: {
        type: Number,
        required: true
    },

    expense: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const transaction = mongoose.model('trans', transactionSchema);
export default transaction;