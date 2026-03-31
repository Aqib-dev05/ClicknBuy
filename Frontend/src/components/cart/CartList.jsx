import React, { useEffect } from "react";
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


function CartList({ onQuantityChange, getQuantity }) {

  const { loading, error, cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartData = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getCart();
        if (data) {
          dispatch(addToCartRedux(data));
          toast.success("Fetched Cart successful!");
        }
      } catch (err) {
        const message = err?.response?.data?.message;
        dispatch(setError(message || "An unexpected error occurred."));
        toast.error(`Something went wrong. ${error}`);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCartData();
  }, []);

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


  if (cartItems.length === 0) return (
    <div className=" text-2xl text-center bg-red-300 my-4 py-6 px-8 ">
      No Product Found in Cart
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      {loading && <HashLoader className="mt-16" />}
      <div className="mt-8 hidden md:block overflow-x-auto">
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
            {cartItems.map((item) => (
              <tr key={item.product._id}>
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
                  Rs.{item.product.discountedPrice.toFixed(2)}
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
                  Rs.{(item.product.discountedPrice * item.quantity).toFixed(2)}
                </td>


                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-semibold">
                  <Trash2
                    onClick={() => handleRemoveFromCart(item.product._id)}
                    cursor={"pointer"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
      {/* Mobile View: Cards */}
      <div className="mt-8 md:hidden grid grid-cols-1 gap-4 ">
        {cartItems.map((item) => (
          <div
            key={item.product._id}
            className="bg-white p-4 rounded-lg shadow border border-gray-200"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-gray-900">
                <img
                  onClick={() => handleViewProduct(item.product._id)}
                  className="w-14 h-14 cursor-pointer "
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
              <span>Rs.{item.product.discountedPrice.toFixed(2)}</span>
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
                Rs.{(item.product.discountedPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartList;
