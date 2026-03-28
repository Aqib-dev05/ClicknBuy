import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Heart } from "lucide-react";
import { cn } from "../../utils/merge";
import { setLocally, getLocally } from "../../utils/LocalStore.jsx";

function Wish({ classList = "", payload, size = "16px" }) {

  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    const existingItems = getLocally("wishlist") || [];
    const isAlreadyWished = existingItems.some((item) => item._id === payload._id);
    setIsWished(isAlreadyWished);
  }, [payload._id]);

  const handleWishedProduct = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const existingItems = getLocally("wishlist") || [];
    const isAlreadyWished = existingItems.some((item) => item._id === payload._id);

    if (isAlreadyWished) {
      const updatedWishlist = existingItems.filter((item) => item._id !== payload._id);
      setLocally("wishlist", updatedWishlist);
      setIsWished(false);
      toast.info("Removed from wishlist");
    } else {
      const updatedWishlist = [...existingItems, payload];
      setLocally("wishlist", updatedWishlist);
      setIsWished(true);
      toast.success("Added to wishlist");
    }
  };


  return (
    <button
      type="button"
      onClick={handleWishedProduct}
      title="Add to Wishlist"
      className={cn(classList)}
    >
      <Heart
        size={size}
        fill={isWished ? "red" : "none"}
        stroke={isWished ? "red" : "black"}
      />
    </button>
  );
}

export default Wish;
