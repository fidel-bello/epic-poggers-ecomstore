import { Document } from 'mongoose';

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    role: string,
    createdAt: Date,
    resetPasswordToken: string,
    resetPasswordExpire: Date,
    // eslint-disable-next-line no-unused-vars
    comparePassword(params: IUser): string,
    generateResetPassowrd(): string
}
