import bcrypt from "bcrypt";
import { sendCookies } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userModels.js";
// import { Property } from '../models/Property.js';

export const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, userType, password } =
    req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const hashpass = await bcrypt.hash(password, 10);
    user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      userType,
      password: hashpass,
    });

    sendCookies(user, res, "Register Success", 201);
  } catch (error) {
    console.log(error);
    next(ErrorHandler);
  }
};

export const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");
      // console.log(user.password)
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User does not exist or Incorrect Email",
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
      sendCookies(user, res, `Welcome Back, ${user.firstName}`, 200);
    } catch (error) {
      console.error(error);
      next(error); 
    }
  };  

export const getProfile = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expire: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV !== "Development",
    })
    .json({
      success: true,
    });
};

const generateRandomToken = () => {
  return Math.random().toString(36).substring(2, 10); // Generate a random alphanumeric string
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = generateRandomToken();
    const tokenExpire = Date.now() + 600000;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MYEMAIL,
        pass: process.env.MYPASS,
      },
    });

    const site = `${server}/${email}/${tokenExpire}`;
    const mailOptions = {
      from: { name: "Rentify", address: process.env.MYEMAIL },
      to: email,
      subject: "Reset Password",
      text: `Here is your password reset link: ${site}`,
    };

    transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  const email = token; 

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const editUserDetails = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User details updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    next(ErrorHandler);
  }
};
