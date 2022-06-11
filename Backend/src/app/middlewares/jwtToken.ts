/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
import { Response } from 'express';
import nodemailer from 'nodemailer'; // https://nodemailer.com/usage/ great for sending mail ... using mailtrap as a sandbox
import { Auth_Controllers } from '../controllers/authControllers';
import { IProducts, Product } from '../models/product';

export const sendToken = (user: any, statusCode: number, res: Response) => {
  const token = user.getToken();

  const expire = 7 * 15 * 60 * 1000;

  const options = {
    expires: new Date(Date.now() + expire),
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    message: `Welcome Back ${user.name}`,
    token,
    user,
  });
};

export const sendEmail = async (options: { email: string; subject: string; message: string; }) => {
  const user = new Auth_Controllers();

  const transport = nodemailer.createTransport({
    host: user.mailHost,
    port: user.mailPort,
    auth: {
      user: user.mailUser,
      pass: user.mailPassword,
    },
  });

  const message = {
    from: `${user.fromName} <${user.fromEmail}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(message);
};

export async function updateStock(id: string, quantity: number) {
  const product = await Product.findById(id) as IProducts;
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
