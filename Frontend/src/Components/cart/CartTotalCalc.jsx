import React, { useEffect, useState } from "react";
import Button from "../layouts/Button";
import { toast } from "react-toastify";
import {useSelector} from "react-redux"
import { motion as Motion } from "framer-motion";

function CartTotalCalc() {

   const [subPrice,setSubPrice] = useState(0);
   const {cartItems} = useSelector((state)=>state.cart)

   const calSubTotal = ()=>{
    let sub = 0;
    cartItems.forEach((item)=>{
      sub += item.product.discountedPrice * item.quantity;
    })
    setSubPrice(sub);
   }

   useEffect(()=>{
    calSubTotal();
   },[cartItems])

  return (
    <Motion.div
      className=" border-[1px] border-black p-4 w-[300px] max-md:w-[94vw] max-md:mx-auto "
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Motion.h4
        className="text-lg font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        Cart Total
      </Motion.h4>
      <div className="flex justify-between items-center mt-3 mb-2 ">
        <p>Subtotal:</p>
        <p>Rs. {subPrice}</p>
      </div>
      
      <hr />
      <div className="flex justify-between items-center mt-3 mb-2 ">
        <p>Shipping:</p>
        <p>Rs.400</p>
      </div>
      
      <hr />
      <div className="flex justify-between items-center mt-3 mb-2 ">
        <p>Total:</p>
        <p>Rs.{subPrice + 400}</p>
      </div>
      <br /><br />
      <Button text={"Proceed to Checkout"} onClick={()=>toast.info("Functionality Soon!")} />
    </Motion.div>
  );
}

export default CartTotalCalc;
