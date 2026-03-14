import React,{  useState} from 'react'
import authImage from "../../assets/dl.beatsnoop.png"
import Button from '../layouts/Button'
import { toast } from 'react-toastify'
import { login } from '../../services/authService'
import {useDispatch,useSelector} from "react-redux";
import { setUser,setToken,setIsAuthenticated,setError,setLoading } from '../../Redux/Slices/authSlics'
import {HashLoader} from "react-spinners"


function LoginForm() {
  const {error,loading}= useSelector((state)=>state.auth);


     const dispatch = useDispatch();

     const [form, setForm] = useState({
       email: "",
       password: ""
     });

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

     if(!form.email || !form.password){
      toast.error("Please Fill All the Fields!")
      
      return;
     }
     try {
      dispatch(setLoading(true))
       const data = await login({
        email:form.email,
        password:form.password
       });

       if (data && data.user && data.token) {
         dispatch(setUser(data.user));
         dispatch(setToken(data.token));
         dispatch(setIsAuthenticated(true));
         toast.success("Login successful!");

       } else {
         // handle case when login fails (wrong credentials, etc.)
         console.log(data)
         toast.error(data?.message || "Login failed. Please check your credentials.");
         dispatch(setIsAuthenticated(false));
         dispatch(setError(data?.message || "Login failed. Please check your credentials."));
       }
     } catch (error) {
        const message=error.response?.data?.message;
       toast.error(`Something went wrong. ${message}`);
       dispatch(setIsAuthenticated(false));
       dispatch(setError(message || "An unexpected error occurred."));
     }
     finally{
      dispatch(setLoading(false))

     }
   }

  return (
    <section className='flex  items-center  overflow-hidden w-full'>
        <div className=' hidden lg:flex justify-end items-end p-6 w-full'>
            <img src={authImage} loading='lazy' className='object-cover w-[90%]' alt="store" />
        </div>
        <form method='post' className=' flex flex-col items-center max-lg:justify-center max-lg:min-h-[70vh]  w-full'>
          {loading && <HashLoader />};
            <div className='md:w-[50%]  w-[90%]'>
            <h2 className='text-2xl font-semibold'>Log In to Click&Buy</h2>
            </div>
            <input onChange={handleInputChange} className='border-b-2 border-black py-1 md:w-[50%] w-[90%] mt-6 ' type="text" name="email" placeholder='Enter Your Email*' required:true />
            <input onChange={handleInputChange} className='border-b-2 border-black py-1 md:w-[50%] w-[90%] mt-6 ' type="password" name='password' placeholder='Enter Your Password*' required:true />
            <h4 className='my-4 bg-red-100 italic text-lg font-md'>{error}</h4>
            <div className='flex items-center  mt-3 gap-9 flex-wrap'>
                <Button type='submit' onClick={handleSubmit}  text={"Login"}/>
                <span className='text-[crimson] cursor-pointer font-semibold ' onClick={()=>toast.info("Feature will be added in Future")}>Forget Password?</span>
            </div>
        </form>
    </section>
  )
}

export default LoginForm