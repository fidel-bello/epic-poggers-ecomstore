import { Auth_Controllers } from "../controllers/authControllers";
import express from "express";


const router = express.Router();
const User = new Auth_Controllers();

router.route('/register').post(User.registerUser);

export default router

