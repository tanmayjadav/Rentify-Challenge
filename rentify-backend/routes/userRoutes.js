import express from "express"
import {
  registerUser,
  loginUser,
  getProfile,
  logout,
  forgotPassword,
  resetPassword,
  editUserDetails,
} from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/Auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', getProfile);
router.get('/logout', isAuthenticated, logout);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);
router.put('/editdetails', isAuthenticated, editUserDetails);

export default router;