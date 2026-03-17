import React, { useEffect } from 'react'
import { getCart, removeFromCart, updateCartItem, clearCart } from "../../services/cartService"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import { HashLoader } from "react-spinners"
import {
  addToCartRedux,
  removeFromCartRedux,
  clearCartRedux,
  updateCartItemQuantityRedux,
  setLoading,
  setError,
} from "../../Redux/Slices/cartSlice"

function CartList() {
  const dispatch = useDispatch();
  const { loading, error, cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchCartData = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getCart();
        if (data) {
          dispatch(addToCartRedux(data));
          console.log(data)
          console.log(cartItems)
          toast.success("Fetched Cart successful!");
        }
      } catch (err) {
        const message = err?.response?.data?.message;
        dispatch(setError(message || "An unexpected error occurred."));
        toast.error(`Something went wrong. ${err}`);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCartData();
  }, []);

  useEffect(() => {
   console.log(cartItems)
  }, [cartItems]);


  return (
    <div className="container mx-auto p-4">
      {loading && <HashLoader className='mt-16' />}
     
    </div>
  );
}


export default CartList