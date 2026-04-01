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
    <section className='flex  items-center  overflow-x-hidden w-full'>
      <div className=' hidden lg:flex justify-end items-end p-6 w-full'>
        <img src={authImage} loading='lazy' className='object-cover w-[80%]' alt="store" />
      </div>
      <form method='post' className=' flex flex-col items-center max-lg:justify-center max-lg:min-h-[70vh]  w-full'>
        {loading && <HashLoader />};
        <div className='md:w-[50%]  w-[90%]'>
          <h2 className='text-2xl font-semibold'>Sign Up to Click&Buy</h2>
        </div>
        <input onChange={handleInputChange} className='border-b-2 focus:outline-none border-black py-1 md:w-[50%] w-[90%] mt-6 ' type="text" name="name" placeholder='Enter Your Name*' />
        <input onChange={handleInputChange} className='border-b-2 focus:outline-none border-black py-1 md:w-[50%] w-[90%] mt-6 ' type="text" name="email" placeholder='Enter Your Email*' />
        <input onChange={handleInputChange} className='border-b-2 focus:outline-none border-black py-1 md:w-[50%] w-[90%] mt-6 ' type="password" name='password' placeholder='Enter Your Password*' />
        <h4 className='my-4 bg-red-100 italic text-lg font-md'>{error}</h4>
        <span className='text-[crimson] cursor-pointer font-semibold ' onClick={() => toast.info("Feature will be added in Future")}>Forget Password?</span>
        <div className="flex items-center md:w-[50%] w-[60%]  mt-3 gap-9 flex-wrap">
          <Button type="submit" width="full" onClick={handleSubmit} text={"Sign Up"} />
        </div>
        <br />
        <p className="mt-4">
          Already Signed Up? <Link to={"/login"} className="text-blue-500 hover:text-red-600 italic  font-semibold">Login</Link>
        </p>
      </form>
    </section>
  )
}

export default RegisterForm