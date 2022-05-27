import { Auth_Controllers } from "../controllers/authControllers";
import express from "express";
import { Role } from "../models/user";

const router = express.Router();
const User = new Auth_Controllers();
const admin = Role.Admin;

router.route('/login').post(User.loginUser);
router.route('/register').post(User.registerUser);
router.route('/password/forgot').post(User.forgotPassword);

router.route('/password/reset/:token').put(User.resetPassword);
router.route('/user/update').put(User.isAuthenticated, User.updateUser);
router.route('/password/update').put(User.isAuthenticated, User.updatePassword);

router.route('/user/:id').get(User.getUserProfile);
router.route('/admin/users').get(User.isAuthenticated, User.authorizeRoles(admin), User.adminGetAllRoutes)
router.route('/logout').get(User.logoutUser);

export default router

