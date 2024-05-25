import jwt from 'jsonwebtoken';

export const sendCookies = (user, res, message, statusCode = 200) => {
//   console.log(process.env.NODE_ENV);
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.status(statusCode || 201).cookie('token', token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
    secure: process.env.NODE_ENV !== 'Development',
  }).json({
    success: true,
    user: user,
    message: message || 'Successfully registered',
  });
};
