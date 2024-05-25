import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUserLocalStorage } from "../redux/slice/userSlice"; 
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster } from "sonner";
import { server } from "@/main";
import { Button } from "../ui/button";

const zodSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

// Yup schema
const yupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const res = await axios.post(`${server}/api/login`, formData,{
        withCredentials: true, 
      });
      console.log(res.data.user)
      const userId = res.data.user._id;
      const userType = res.data.user.userType;
      console.log(userId,userType)
      if (res.data.success){
        dispatch(setUserLocalStorage({userId,userType}));
        toast.success("Login Successfully")
        if (userType == "seller"){
          navigate("/seller/allproducts")
        }else{
          navigate("/explore");
        }
      }
    
    } catch (error) {
      console.error(error.response?.data?.error);
      toast.error(
        error.response?.data?.error || "Invalid Credentials."
      );
    }
  };

  return (
    <>
      <div>
        <section className="flex flex-col md:flex-row h-screen items-center">
          <div className="bg-primary dark:bg-gray-800 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
            {/* <Image src="https://source.unsplash.com/random" alt="" className="w-full h-full object-cover" width="100" height="100"/> */}
          </div>

          <div
            className="bg-background w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
    flex items-center justify-center"
          >
            <div className="w-full h-100">
              <div className="inline-block">
                <Link
                  to="/"
                  className="flex group text-blue-500 hover:text-blue-700 font-semibold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 group-hover:animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  <span className="px-2">Home</span>
                </Link>
              </div>
              <h1 className="text-xl md:text-2xl font-bold dark:text-white leading-tight mt-12">
                Log in to your account
              </h1>

              <form
                className="mt-6"
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label className="block text-gray-700 dark:text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email Address"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-background mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="error text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-background mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="error text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="text-right mt-2">
                  <Link
                    to="/login/forgotpassword"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-700 focus:text-blue-700"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button className="md:text-lg w-full p-6 mt-6 bg-primary dark:text-white">
                  Log In
                </Button>
              </form>
              <hr className="my-6 border-gray-300 w-full" />

              <p className="mt-8 dark:text-white">
                Need an account?{" "}
                <Link to="/register">
                  <span className="text-blue-500 hover:text-blue-700 font-semibold">
                    Create an account
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </section>
        <Toaster richColors position="bottom-left" />
      </div>
    </>
  );
};

export default Login;
