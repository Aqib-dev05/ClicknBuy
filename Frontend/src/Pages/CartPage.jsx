import React, { useState } from "react";
import CartList from "../Components/cart/CartList";
import CartTotalCalc from "../Components/cart/CartTotalCalc";
import Button from "../Components/layouts/Button";
import { useNavigate } from "react-router-dom";
import { clearCart, getCart, bulkUpdate } from "../services/cartService";
import { toast } from "react-toastify";
import {
  setError,
  setLoading,
  clearCartRedux,
  addToCartRedux,
} from "../Redux/Slices/cartSlice";
import { useDispatch } from "react-redux";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatedCart, setUpdatedCart] = useState([]);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;

    setUpdatedCart((prev) => {
      const exists = prev.find((i) => i.productId === productId);

      if (exists) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity } : i,
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const getQuantity = (item) => {
    const updated = updatedCart.find((i) => i.productId === item.product._id);

    return updated ? updated.quantity : item.quantity;
  };

  const handleUpdateCart = async () => {
    if (updatedCart.length === 0) {
      toast.info("No changes to update");
      return;
    }

    try {
      dispatch(setLoading(true));

      const res = await bulkUpdate(updatedCart);
      if (!res) throw new Error("Update failed");

      const data = await getCart();
      dispatch(clearCartRedux());
      dispatch(addToCartRedux(data));

      toast.success("Cart updated successfully");

      setUpdatedCart([]);
    } catch (err) {
      const message = err?.response?.data?.message;
      toast.error(message || "Update failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClearCart = async () => {
    const confirm = window.confirm("Are you sure to clear the cart?");
    if (!confirm) return;

    dispatch(setLoading(true));

    try {
      const res = await clearCart();

      if (res) {
        toast.success("Cart cleared successfully");
        dispatch(clearCartRedux());
      }
    } catch (err) {
      const message = err?.response?.data?.message;
      dispatch(setError(message || "An unexpected error occurred."));
      toast.error(message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex max-md:flex-col-reverse justify-between items-center w-full px-4 lg:px-8">
          <h1 className="text-3xl max-md:text-xl font-extrabold text-gray-900 mb-2 font-mono">
            Your Shopping Cart
          </h1>

          <Button
            onClick={handleClearCart}
            text={"Clear Cart"}
            varient="blacked"
            className="rounded-md"
          />
        </div>

        <CartList
          onQuantityChange={handleQuantityChange}
          getQuantity={getQuantity}
        />

        <div className="my-6 flex-wrap-reverse gap-y-2 flex w-full justify-between items-center px-4 sm:px-6 lg:px-8">
          <Button
            onClick={() => navigate("/products")}
            text={"Return to Shop"}
            varient="outlined"
            className="hover:bg-black hover:text-white rounded-sm transition duration-200"
          />

          <Button
            onClick={handleUpdateCart}
            text={"Update Cart"}
            varient="default"
            className="hover:bg-blue-600 hover:text-white rounded-sm transition duration-200"
          />
        </div >
        <div className="flex justify-end w-full px-4 sm:px-6 lg:px-8 mt-3">

        <CartTotalCalc   />
        </div>
      </div>
    </div>
  );
}

export default CartPage;
