
import  mongoose  from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({

    firstname: {
        type: String,
        required: true
    },

    lastname : {
        type: String,
        required: true
        
    },

    phone : {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    city :{
        type: String,  
        required: true
    }
});

const user = mongoose.model('users', userSchema);
export default user;

