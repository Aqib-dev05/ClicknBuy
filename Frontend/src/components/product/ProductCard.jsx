import { Heart, ShoppingCart, Eye, Check, Loader2 } from "lucide-react";
import React, { useState } from "react";
import sampleImage from "../../assets/Frame 694.png";
import { useNavigate } from "react-router-dom";
import Button from "../layouts/Button";
import Wish from "../wishlist/Wish";
import RatingStars from "./RatingStars";
import { addToCart } from "../../services/cartService.js"
import { toast } from "react-toastify";
import { setError, setLoading } from "../../Redux/Slices/cartSlice.js"
import { useDispatch, useSelector } from "react-redux";
import cloudinaryOptimizer from "../../utils/cloudinaryOptimizer.js"
import { getLocally, setLocally } from "../../utils/LocalStore.jsx";
import { motion as Motion } from "framer-motion";

export default function ProductCard({
  payload
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [cartStatus, setCartStatus] = useState("idle"); // 'idle', 'loading', 'success'


  function handleViewProduct() {
    navigate(`/products/${payload._id}`)
  }


  async function handleCartInsertion() {
    if (cartStatus !== "idle") return;

    if (!user) {
      toast.error("Please login to add product to cart!");
      return;
    }

    setCartStatus("loading");
    dispatch(setLoading(true));
    try {
      const data = await addToCart(payload._id, 1);

      if (data) {
        toast.success("Product added to cart successfully!");
        setCartStatus("success");
        const inLS = getLocally("wishlist");
        if (inLS) {
          const updatedWishlist = inLS.filter((item) => item._id !== payload._id);
          setLocally("wishlist", updatedWishlist);
        }

        // Reset to idle after 2 seconds
        setTimeout(() => {
          setCartStatus("idle");
        }, 2000);
      }
    }
    catch (err) {
      console.log(err)
      toast.error("Failed to add product to cart!");
      dispatch(setError(err.message));
      setCartStatus("idle");
    }
    finally {
      dispatch(setLoading(false));
    }
  }


  return (
    <>

      <Motion.div
        className="group relative flex w-[88%] max-w-xs flex-col rounded-md border border-gray-200 bg-white p-2 sm:p-3 shadow-md transition hover:shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Wishlist */}

        <div className="absolute top-6 right-6 flex flex-col justify-center items-center gap-1 ">
          <Wish
            classList=" cursor-pointer z-10 rounded-full bg-white p-1.5 shadow-sm transition hover:bg-gray-100"
            payload={payload} />
          <button
            type="button"
            title="View Product"
            className=" cursor-pointer  z-10 rounded-full bg-white p-1.5 shadow-sm transition hover:bg-gray-100"
            onClick={handleViewProduct}

          >
            <Eye
              className="h-4 w-4"
            />
          </button>
        </div>

        {/* Image + hover CTA */}
        <div className=" flex flex-col  max-md:h-60 h-75 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-50">
          <img
            src={cloudinaryOptimizer(payload.images[0].url) || sampleImage}
            alt={payload.title || "Sample product"}
            loading="lazy"
            className="w-[90%] h-[90%]  rounded-lg  object-cover transition duration-300 group-hover:scale-105"
          />

        </div>
        <Button
          icon={
            cartStatus === "loading" ? "Processing..." :
              cartStatus === "success" ? "Added!" :
                "Add to Cart"
          }
          varient="blacked"
          onClick={handleCartInsertion}
          text={
            cartStatus === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> :
              cartStatus === "success" ? <Check className="h-4 w-4" /> :
                <ShoppingCart className="h-4 w-4" />
          }
          className={`pointer-events-auto mb-2 mx-auto w-full max-md:w-[90%] items-center justify-center gap-2 flex rounded-md py-1.5 text-xs font-semibold text-white shadow-sm transition ${cartStatus === "success" ? "bg-green-600 hover:bg-green-700" : "bg-[rgb(219,68,68)] hover:bg-[rgb(190,50,50)]"
            }`}
          disabled={cartStatus === "loading"}
        />

        {/* Title */}
        <h3 className="line-clamp-2 text-md font-semibold text-gray-900">
          {payload.name || "Sample Product Title Goes Here"}
        </h3>

        {/* Price */}
        <div className="mt-1 flex items-center gap-2 text-lg">
          <span className="font-bold text-[rgb(219,68,68)]">
            ${(payload.discountedPrice ?? payload.basePrice) ?? 120}
          </span>
          {payload.basePrice && (
            <span className="text-xs text-gray-400 line-through">
              {payload.basePrice}
            </span>
          )}
        </div>

        <RatingStars rating={payload.rating} reviews={payload.reviews} />
      </Motion.div>
    </>
  );
}
