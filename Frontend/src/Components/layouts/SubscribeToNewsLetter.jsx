import React, { useState } from 'react'
import Button from "./Button";
import {toast} from "react-toastify"


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
      <div className="w-full space-y-4   bg-[#000] p-6 md:p-12">
            <p className="text-center text-xl font-semibold text-white md:text-2xl">
              Subscribe to our newsletter
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mx-auto flex max-w-md flex-col items-center gap-3 sm:flex-row"
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
            </form>
      <div className="w-[90%] mb-5 mt-15 bg-gray-400 h-[1px] mx-auto "></div>
          </div>
  )
}

export default SubscribeToNewsLetter