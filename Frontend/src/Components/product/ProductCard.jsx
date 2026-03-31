import { Heart, ShoppingCart, Eye } from "lucide-react";
import sampleImage from "../../assets/Frame 694.png";
import { useNavigate } from "react-router-dom";
import Button from "../layouts/Button";
import Wish from "../wishlist/Wish";
import RatingStars from "./RatingStars";
import { addToCart } from "../../services/cartService.js"
import { toast } from "react-toastify";
import {setError,setLoading} from "../../Redux/Slices/cartSlice.js"
import { useDispatch } from "react-redux";
import cloudinaryOptimizer from "../../utils/cloudinaryOptimizer.js"
import { getLocally, setLocally } from "../../utils/LocalStore.jsx";

export default function ProductCard({
  payload
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  function handleViewProduct() {
    navigate(`/products/${payload._id}`)
  }

  
  async function handleCartInsertion() {
   dispatch(setLoading(true));
    try{
    const  data  = await addToCart(payload._id, 1);
   
    if(data){
      toast.success("Product added to cart successfully!")
      const inLS = getLocally("wishlist");
      if(inLS){
        const updatedWishlist = inLS.filter((item) => item._id !== payload._id);
        setLocally("wishlist", updatedWishlist);
      }
    }
    }
    catch(err){
      toast.error("Failed to add product to cart!");
      dispatch(setError(err.message));
    }
    finally{
      dispatch(setLoading(false));
    }
  }


  return (
    <>

      <div className="group relative flex w-[88%] max-w-xs flex-col rounded-md border border-gray-200 bg-white p-2 sm:p-3 shadow-md transition hover:shadow-lg">
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
            icon="Add to Cart"
            varient="blacked"
            onClick={handleCartInsertion}
            text={<ShoppingCart className="h-4 w-4" />}
            className="pointer-events-auto mb-2  mx-auto w-full max-md:w-[90%]   items-center justify-center gap-2 flex rounded-md bg-[rgb(219,68,68)]  py-1.5 text-xs font-semibold text-white shadow-sm transition"
          />

        {/* Title */}
        <h3 className="line-clamp-2 text-md font-semibold text-gray-900">
          {payload.name || "Sample Product Title Goes Here"}
        </h3>

        {/* Price */}
        <div className="mt-1 flex items-center gap-2 text-lg">
          <span className="font-bold text-[rgb(219,68,68)]">
            Rs. {(payload.discountedPrice ?? payload.basePrice) ?? 120}
          </span>
          {payload.basePrice && (
            <span className="text-xs text-gray-400 line-through">
             {payload.basePrice}
            </span>
          )}
        </div>

        <RatingStars rating={payload.rating} reviews={payload.reviews} />
      </div>
    </>
  );
}
