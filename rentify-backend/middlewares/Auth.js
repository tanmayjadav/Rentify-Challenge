import jwt from 'jsonwebtoken';
import { User } from '../models/userModels.js';

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(req.cookies)
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Please login to access this resource',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: 'Invalid Token',
    });
  }
};
