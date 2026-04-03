import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../../services/cartService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { Trash2, PenLine } from "lucide-react";
import QuantitySelector from "../product/QuantitySelector";
import {
  addToCartRedux,
  removeFromCartRedux,
  setLoading,
  setError,
} from "../../Redux/Slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Button from "../layouts/Button";
import cloudinaryOptimizer from "../../utils/cloudinaryOptimizer";
import { motion as Motion, AnimatePresence } from "framer-motion";


function CartList({ onQuantityChange, getQuantity }) {

  const { loading, error, cartItems } = useSelector((state) => state.cart);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartData = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getCart();
        if (data) {
          dispatch(addToCartRedux(data));
          console.log(data)
          toast.success("Fetched Cart successful!");
        }
      } catch (err) {
        console.log(err)
        const message = err?.response?.data?.message;
        dispatch(setError(message || "An unexpected error occurred."));
        toast.error(`Something went wrong. ${error}`);
      } finally {
        dispatch(setLoading(false));
        setInitialLoading(false);
      }
    };

    fetchCartData();
  }, [dispatch]);

  async function handleRemoveFromCart(productId) {
    const confirm = window.confirm(
      "Are you sure to remove this item from the cart?",
    );
    if (!confirm) return;
    try {
      dispatch(setLoading(true));
      const res = await removeFromCart(productId);
      if (res) {
        toast.success("product removed from Cart successfully");
        dispatch(removeFromCartRedux(productId));
      }
    } catch (err) {
      const message = err?.response?.data?.message;
      toast.error(
        `Something went wrong. ${message || "An unexpected error occurred."}`,
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  function handleViewProduct(_id) {
    navigate(`/products/${_id}`);
  }

  // Show full-screen loader during initial data fetch
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center w-full min-h-[50vh]">
        <HashLoader color="#dc2626" />
      </div>
    )
  }

  if (cartItems?.length === 0) return (
    <Motion.div
      className=" text-2xl text-center bg-red-300 my-4 py-6 px-8 "
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      No Product Found in Cart
    </Motion.div>
  )

  return (
    <Motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {loading && <div className="w-full flex justify-center items-center mt-16"><HashLoader /></div>}
      <Motion.div
        className="mt-8 hidden md:block overflow-x-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                Subtotal
              </th>

              <th className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <Motion.tr
                  key={item.product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 text-sm font-medium text-gray-900">
                    <img
                      onClick={() => handleViewProduct(item.product._id)}
                      className="w-14 h-14 cursor-pointer "
                      src={cloudinaryOptimizer(item.product.images[0].url)}
                      alt="image"
                    />
                    <p> {item.product.name}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${item.product.discountedPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {/* {item.quantity} */}
                    <QuantitySelector
                      quantity={getQuantity(item)}
                      onChange={(newQty) =>
                        onQuantityChange(item.product._id, newQty)
                      }
                      handleIncrease={() => onQuantityChange(item.product._id, getQuantity(item) + 1)}
                      handleDecrease={() => onQuantityChange(item.product._id, getQuantity(item) - 1)}
                    />
                  </td>
                  <td className="px-6 py-4  whitespace-nowrap text-sm text-red-500 font-semibold">
                    ${(item.product.discountedPrice * item.quantity).toFixed(2)}
                  </td>


                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-semibold">
                    <Trash2
                      onClick={() => handleRemoveFromCart(item.product._id)}
                      cursor={"pointer"}
                    />
                  </td>
                </Motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </Motion.div>{" "}
      {/* Mobile View: Cards */}
      <div className="mt-8 md:hidden grid grid-cols-1 gap-4 ">
        <AnimatePresence>
          {cartItems.map((item, index) => (
            <Motion.div
              key={item.product._id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900">
                  <img
                    onClick={() => handleViewProduct(item.product._id)}
                    className="w-14 h-14 cursor-pointer object-cover rounded"
                    src={item.product.images[0].url}
                    alt="image"
                  />
                  <p> {item.product.name}</p>
                </h3>
                <button className="text-red-500  ">
                  <Trash2
                    onClick={() => handleRemoveFromCart(item.product._id)}
                    cursor={"pointer"}
                  />
                </button>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Price:</span>
                <span>${item.product.discountedPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Quantity:</span>
                <span>
                  {" "}
                  <QuantitySelector
                    quantity={getQuantity(item)}
                    onChange={(newQty) =>
                      onQuantityChange(item.product._id, newQty)
                    }
                    handleIncrease={() => onQuantityChange(item.product._id, getQuantity(item) + 1)}
                    handleDecrease={() => onQuantityChange(item.product._id, getQuantity(item) - 1)}
                  />
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-red-500 mt-2 pt-2 border-t border-gray-100">
                <span>Subtotal:</span>
                <span>
                  ${(item.product.discountedPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            </Motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Motion.div>
  );
}

export default CartList;
