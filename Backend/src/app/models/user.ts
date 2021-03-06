/* eslint-disable no-return-await */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-useless-escape */
import {
  Schema,
  Model,
  model,
} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { IUser } from '../interface/Iuser';

const validateEmail = (email: string) => {
  const validators = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return validators.test(email);
};

export enum Role
{
    Admin = 'admin',
    User = 'user',
}

const userSchema: Schema = new Schema({

  name: { type: String, required: [true, 'Please enter your name'], maxlength: [50, 'Name exceeded amount of allowed characters'] },
  email: {
    type: String, required: [true, 'Please enter your email'], unique: true, validate: [validateEmail, 'Please enter a valid email'],
  },
  password: {
    type: String, required: [true, 'You must enter a password'], minlength: [6, 'Password must exceed 6 characters'], select: false,
  },
  role: {
    type: String, enum: Object.values(Role), default: Role.User, required: true,
  },
  createdAt: { type: Date, default: Date.now },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare
userSchema.methods.comparePassword = async function (enteredpassword: string) {
  return await bcrypt.compare(enteredpassword, this.password);
};

// return jwt token
userSchema.methods.getToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

userSchema.methods.generateResetPassowrd = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

export const User: Model<IUser> = model('User', userSchema);
