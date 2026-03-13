import { Heart, ShoppingCart, Star,Eye } from "lucide-react";
import sampleImage from "../../assets/Frame 694.png";
import Button from "../layouts/Button";
import { useState,useEffect } from "react";
import {toast} from "react-toastify"

export default function ProductCard({
  image,
  title,
  basePrice,
  discountedPrice,
  rating = 3.5,
  reviews = 120,
}) {
  const [isWished, setIsWished] = useState(false);

  const handleWishlistClick = () => {
    setIsWished(prev => !prev)
  };

  useEffect(() => {
    if(isWished)
    toast.warn("Product added!")
    
  }, [isWished]);

  return (
    <>
    
    <div className="group relative flex w-full max-w-xs flex-col rounded-md border border-gray-200 bg-white p-3 shadow-md transition hover:shadow-lg">
      {/* Wishlist */}
      <button
        type="button"
        onClick={handleWishlistClick}
        title="Add to Wishlist"
        className="absolute cursor-pointer right-3 top-3 z-10 rounded-full bg-white p-1.5 shadow-sm transition hover:bg-gray-100"
      >
        <Heart
          className="h-4 w-4"
          fill={isWished ? "red" : "white"}
          stroke={isWished ? "red" : "currentColor"}
        />
      </button>
       <button
        type="button"
        title="View Product"
        className="absolute cursor-pointer right-3 top-12 z-10 rounded-full bg-white p-1.5 shadow-sm transition hover:bg-gray-100"
      >
        <Eye
          className="h-4 w-4"
        />
      </button>

      {/* Image + hover CTA */}
      <div className="relative mb-3 flex flex-col gap-2 h-70 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        <img
          src={image || sampleImage}
          alt={title || "Sample product"}
          className="w-[95%] object-cover transition duration-300 group-hover:scale-105"
        />

        <Button
          icon="Add to Cart"
          width="full"
          varient="blacked"
          text={<ShoppingCart className="h-4 w-4" />}
          className="pointer-events-auto  mx-auto   items-center justify-center gap-2 flex rounded-md bg-[rgb(219,68,68)]  py-1.5 text-xs font-semibold text-white shadow-sm transition"
        />
      </div>

      {/* Title */}
      <h3 className="line-clamp-2 text-md font-semibold text-gray-900">
        {title || "Sample Product Title Goes Here"}
      </h3>

      {/* Price */}
      <div className="mt-1 flex items-center gap-2 text-lg">
        <span className="font-bold text-[rgb(219,68,68)]">
          ${discountedPrice ?? basePrice ?? 120}
        </span>
        {basePrice && (
          <span className="text-xs text-gray-400 line-through">
            ${basePrice}
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5"
              fill={i < Math.round(rating) ? "#FBBF24" : "none"}
              stroke={i < Math.round(rating) ? "#FBBF24" : "#9CA3AF"}
            />
          ))}
        </div>
        <span className="ml-1 text-[11px] text-gray-600">
          {rating.toFixed(1)} ({reviews})
        </span>
      </div>
    </div>
    </>
  );
}
