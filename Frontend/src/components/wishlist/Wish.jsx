import React, { useState } from "react";
import { toast } from "react-toastify";
import { Heart } from "lucide-react";
import { cn } from "../../utils/merge";
import {setLocally, getLocally} from "../../utils/LocalStore.jsx"
import { useDispatch } from "react-redux"
import { addToWishlist, removeFromWishlist, setLoading, setError } from "../../Redux/Slices/wishSlice.js";




function Wish({ classList = "", payload }) {
  const [isWished, setIsWished] = useState(false);
  const dispatch = useDispatch();

 

  const handleWishlistClick = () => {
    setIsWished((prev) => !prev);
    if (!isWished) {
      addToWish(payload);
    } else {
      removeFromWish(payload);
    }
  };


function addToWish(payload) {
  dispatch(setLoading(true));

  try {
    let wishlist = getLocally("wishedItem") || [];

    if (!wishlist.includes(payload)) {
      wishlist.push(payload);
      setLocally("wishedItem", wishlist);
    }

    dispatch(addToWishlist(payload));
    toast.success("Product added!");
  } catch (error) {
    const message = error?.response?.data?.message;
    toast.error(`Something went wrong. ${message}`);
    dispatch(setError(message || "An unexpected error occurred."));
  } finally {
    dispatch(setLoading(false));
  }
}

function removeFromWish(payload) {
  dispatch(setLoading(true));

  try {
    let wishlist = getLocally("wishedItem") || [];

    wishlist = wishlist.filter(id => id !== payload);

    setLocally("wishedItem", wishlist);

    dispatch(removeFromWishlist(payload));
    toast.success("Product removed!");
  } catch (error) {
    const message = error?.response?.data?.message;
    toast.error(`Something went wrong. ${message}`);
    dispatch(setError(message || "An unexpected error occurred."));
  } finally {
    dispatch(setLoading(false));
  }
}

  return (
    <button
      type="button"
      onClick={handleWishlistClick}
      title="Add to Wishlist"
      className={cn(
        `absolute cursor-pointer right-3 top-3 z-10 rounded-full bg-white p-1.5 shadow-sm transition hover:bg-gray-100`,
        classList,
      )}
    >
      <Heart
        className="h-4 w-4"
        fill={isWished? "red" : "none"}
        stroke={isWished ? "red" : "black"}
      />
    </button>
  );
}

export default Wish;
