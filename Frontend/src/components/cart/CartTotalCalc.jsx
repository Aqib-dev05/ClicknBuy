import React, { useEffect, useState } from "react";
import Button from "../layouts/Button";
import { toast } from "react-toastify";
import {useSelector} from "react-redux"
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
    <div className=" border-[1px] border-black p-4 w-[300px] max-md:w-[94vw] max-md:mx-auto ">
      <h4 className="text-lg font-semibold">Cart Total</h4>
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
    </div>
  );
}

export default CartTotalCalc;
