import errorImg from "../../assets/404.svg";
import Button from './Button'
import React from 'react'
import { motion } from "motion/react"

function NotFound() {
    return (
        <div  className=" p-4 flex flex-col-reverse gap-5 items-center justify-center  ">
           <Button 
               text={"Go Back"} 
               
               onClick={() => window.history.back()}
           />
            <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="object-cover"
                src={errorImg}
                alt="404 error"
           
            />
        </div>
    )
}

export default NotFound