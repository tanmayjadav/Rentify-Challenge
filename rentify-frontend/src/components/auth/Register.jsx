import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { Button } from '../ui/button';
import { server } from '@/main';
import { useDispatch } from 'react-redux';
import { setUserLocalStorage } from '../redux/slice/userSlice';

// Zod schema
const zodSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').nonempty('First name is required'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').nonempty('Last name is required'),
  phoneNumber: z.string().min(10, 'Phone Number must be at least 10 characters').nonempty('Phone Number is required'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
  confirmPassword: z.string().nonempty('Confirm Password is required'),
  userType: z.enum(['buyer', 'seller'], 'User type is required'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Yup schema
const yupSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'First name must be at least 2 characters').required('First name is required'),
  lastName: Yup.string().min(2, 'Last name must be at least 2 characters').required('Last name is required'),
  phoneNumber: Yup.string().min(10, 'Phone Number must be at least 10 characters').required('Phone Number is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  userType: Yup.string().oneOf(['buyer', 'seller'], 'User type is required').required('User type is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match").required('Confirm Password is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Choose one resolver at a time for validation (Zod or Yup)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(zodSchema),
    // resolver: yupResolver(yupSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const res = await axios.post(`${server}/api/register`, formData,{
        withCredentials: true, 
      });
      const userId = res.data.user._id;
      const userType = res.data.user.userType;
      console.log(userId,userType)
      console.log(res.data.success)
      if (res?.data?.success){
        dispatch(setUserLocalStorage({userId,userType}));
        toast.success("Registerd Successfully")
        if (userType == "seller"){
          navigate("/seller/allproducts")
        }else{
          navigate("/explore");
        }
      }  
    } catch (error) {
      // console.error(error.response?.data?.error);
      toast.error(error.response?.data?.error || "user already exists");
    }
  };

  return (
    <>
    <div>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-primary dark:bg-gray-800 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen overflow-hidden">
          {/* <Image src="https://source.unsplash.com/random" alt="" className="w-full h-full object-cover" width="100" height="100"/> */}
        </div>

        <div
          className="bg-background w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-2/5 h-screen px-12 lg:px-16 xl:px-12
  flex items-center justify-center overflow-auto"
        >
          <div className="w-full h-100">
            <div className="inline-block pt-10" >
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
                <span className="px-2 ">Home</span>
              </Link>
            </div>
            <h1 className="text-xl md:text-2xl font-bold dark:text-white leading-tight mt-12">
              Create a new account
            </h1>

            <form className="mt-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-4 w-full">
              <div className="w-full">
              <div>
                <label className="block text-gray-700 dark:text-white">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-background mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  {...register('firstName')}
                />
                {errors.firstName && <p className="error text-red-500">{errors.firstName.message}</p>}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 dark:text-white">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-background mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                  {...register('lastName')}
                />
                {errors.lastName && <p className="error text-red-500">{errors.lastName.message}</p>}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 dark:text-white">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-background mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                  {...register('email')}
                />
                {errors.email && <p className="error text-red-500">{errors.email.message}</p>}
              </div>
              </div>
              <div className="w-full">
              <div className="">
                <label className="block text-gray-700 dark:text-white">Phone Number</label>
                <input
                  type="phoneNumber"
                  name="phoneNumber "
                  placeholder="Enter Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-background mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                  {...register('phoneNumber')}
                />
                {errors.phoneNumber && <p className="error text-red-500">{errors.phoneNumber.message}</p>}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-background mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                  {...register('password')}
                />
                {errors.password && <p className="error text-red-500">{errors.password.message}</p>}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 dark:text-white">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-background mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && <p className="error text-red-500">{errors.confirmPassword.message}</p>}
              </div>
              </div>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 dark:text-white">User Type</label>
                <select
                  name="userType"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-background mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  {...register('userType')}
                >
                  <option value="">Select User Type</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
                {errors.userType && <p className="error text-red-500">{errors.userType.message}</p>}
              </div>

              <Button
                className="md:text-lg w-full p-6 mt-6 bg-primary dark:text-white"
              >
                Register
              </Button>
            </form>
            <hr className="my-6 border-gray-300 w-full" />
            
            <p className="mt-8 dark:text-white mb-10">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-blue-500 hover:text-blue-700 font-semibold">
                  Log in
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

export default Register;
