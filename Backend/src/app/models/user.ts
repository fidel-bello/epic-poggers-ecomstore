import mongoose from "mongoose";

const {Schema } = mongoose;

const validateEmail = (email: string) => {

    const validators = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validators.test(email);
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [50, 'Name exceeded amount of allowed characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true, // prevents same email from being registered 
        validate: [validateEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'You must enter a password'],
        minlength: [6, 'Password must exceed 6 characters'],
        select: false //exclude path 
    },
    role: {
        type: String,
        default: 'user' //defaults to normal user
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
})

export const User = mongoose.model('User', userSchema);