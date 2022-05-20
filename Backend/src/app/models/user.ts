import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const {Schema } = mongoose;

const validateEmail = (email: string) => {

    const validators = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validators.test(email);
}

export enum Role
{
    Admin = 'admin',
    User = 'user',
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
        enum: Object.values(Role),
        default: Role.User,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

//compare
userSchema.methods.comparePassword = async function(enteredpassword: string) {
    return await bcrypt.compare(enteredpassword, this.password);
}

//return jwt token
userSchema.methods.getToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
    })
}

export const User = mongoose.model('User', userSchema);