import { Auth_Controllers } from "../controllers/authControllers";
import express from "express";


const router = express.Router();
const User = new Auth_Controllers();

router.route('/register').post(User.registerUser);

router.route('/password/forgot').post(User.forgotPassword);

router.route('/login').post(User.loginUser);

router.route('/user').get(User.isAuthenticated , User.getUserProfile);

router.route('/logout').get(User.logoutUser);

router.route('/password/reset/:token').put(User.resetPassword);
router.route('/user/update').put(User.isAuthenticated, User.updateUser);
router.route('/password/update').put(User.isAuthenticated, User.updatePassword);


export default router

