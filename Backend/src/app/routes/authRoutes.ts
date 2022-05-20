import { Auth_Controllers } from "../controllers/authControllers";
import express from "express";


const router = express.Router();
const User = new Auth_Controllers();

router.route('/register').post(User.registerUser);
router.route('/password/forgot').post(User.forgotPassword)
router.route('/login').post(User.loginUser);
router.route('/logout').get(User.logoutUser);


export default router

