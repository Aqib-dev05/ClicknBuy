import React, { useState } from 'react'
import authImage from "../../assets/dl.beatsnoop.png"
import Button from '../layouts/Button'
import { toast } from 'react-toastify'
import { register } from '../../services/authService'
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken, setIsAuthenticated, setError, setLoading } from '../../Redux/Slices/authSlics'
import { HashLoader } from "react-spinners"
import { Link, Navigate } from "react-router-dom"
import { validateEmail } from "../../Validators/phoneVal"
import { motion as Motion } from "framer-motion";

function RegisterForm() {
  const { error, loading, isAuthenticated } = useSelector((state) => state.auth);


  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please Fill All the Fields!")

      return;
    }

    if (!validateEmail(form.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }


    const sanitizedData = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password.trim(),
    }

    try {
      dispatch(setLoading(true))
      const data = await register({
        name: sanitizedData.name,
        email: sanitizedData.email,
        password: sanitizedData.password
      });

      if (data && data.user && data.token) {
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
        dispatch(setIsAuthenticated(true));
        toast.success("Register successful!");

      } else {
        console.log(data)
        toast.error(data?.message || "Registeration failed.");
        dispatch(setIsAuthenticated(false));
        dispatch(setError(data?.message || "Registeration failed."));
      }
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(`Something went wrong. ${message}`);
      dispatch(setIsAuthenticated(false));
      dispatch(setError(message || "An unexpected error occurred."));
    }
    finally {
      dispatch(setLoading(false))

    }
  }

  if (loading) return <div className="w-full h-[85vh] flex justify-center items-center bg-amber-200 "><HashLoader /> </div>


  return (
    <Motion.section
      className='flex  items-center  overflow-x-hidden w-full'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Motion.div
        className=' hidden lg:flex justify-end items-end p-6 w-full'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <img src={authImage} loading='lazy' className='object-cover w-[80%]' alt="store" />
      </Motion.div>
      <Motion.form
        method='post'
        className=' flex flex-col items-center max-lg:justify-center max-lg:min-h-[70vh]  w-full'
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        {loading && <HashLoader />};
        <Motion.div
          className='md:w-[50%]  w-[90%]'
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className='text-2xl font-semibold'>Sign Up to Click&Buy</h2>
        </Motion.div>
        <Motion.input
          onChange={handleInputChange}
          className='border-b-2 focus:outline-none border-black py-1 md:w-[50%] w-[90%] mt-6 '
          type="text" name="name" placeholder='Enter Your Name*'
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        />
        <Motion.input
          onChange={handleInputChange}
          className='border-b-2 focus:outline-none border-black py-1 md:w-[50%] w-[90%] mt-6 '
          type="text" name="email" placeholder='Enter Your Email*'
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        />
        <Motion.input
          onChange={handleInputChange}
          className='border-b-2 focus:outline-none border-black py-1 md:w-[50%] w-[90%] mt-6 '
          type="password" name='password' placeholder='Enter Your Password*'
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        />
        <h4 className='my-4 bg-red-100 italic text-lg font-md'>{error}</h4>
        <Motion.span
          className='text-[crimson] cursor-pointer font-semibold '
          onClick={() => toast.info("Feature will be added in Future")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          Forget Password?
        </Motion.span>
        <Motion.div
          className="flex items-center md:w-[50%] w-[60%]  mt-3 gap-9 flex-wrap"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <Button type="submit" width="full" onClick={handleSubmit} text={"Sign Up"} />
        </Motion.div>
        <br />
        <Motion.p
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.65 }}
        >
          Already Signed Up? <Link to={"/login"} className="text-blue-500 hover:text-red-600 italic  font-semibold">Login</Link>
        </Motion.p>
      </Motion.form>
    </Motion.section>
  )
}

export default RegisterForm