import React, { useState } from 'react'
import Button from "./Button";
import {toast} from "react-toastify"
import { motion as Motion } from 'framer-motion'


function SubscribeToNewsLetter() {

     const [val,setVal] = useState("");

     function handleChange(e){
      setVal(e.target.value)
     }

    function handleSubscribe(e) {
    e.preventDefault();
    toast.info("Feature is not available yet");
    setVal('');
  }


  return (
      <Motion.div
        className="w-full space-y-4   bg-[#000] p-6 md:p-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
            <Motion.p
              className="text-center text-xl font-semibold text-white md:text-2xl"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Subscribe to our newsletter
            </Motion.p>
            <Motion.form
              onSubmit={handleSubscribe}
              className="mx-auto flex max-w-md flex-col items-center gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <input
                type="email"
                required
                onChange={handleChange}
                value={val}
                placeholder="Enter your email"
                className="h-12 w-full rounded-md border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-gray-400 outline-none focus:border-white/30 focus:ring-2 focus:ring-white/20"
              />
              <Button
                text="Subscribe"
                type="submit"
                varient="blacked"
                className="h-12 w-full text-sm sm:w-fit"
              />
            </Motion.form>
      <div className="w-[90%] mb-5 mt-15 bg-gray-400 h-[1px] mx-auto "></div>
          </Motion.div>
  )
}

export default SubscribeToNewsLetter