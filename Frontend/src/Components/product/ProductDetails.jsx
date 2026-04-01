import React, { useState, useEffect } from "react";
import RatingStars from "./RatingStars";
import QuantitySelector from "./QuantitySelector";
import Wish from "../wishlist/Wish";
import Button from "../layouts/Button";
import ImgPlaceholder from "../../assets/imgPlaceholder.jpg"
import { Heart, Truck, RotateCcw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"
import { getProductById } from "../../services/productService"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux"
import { setLoading, setError } from "../../Redux/Slices/cartSlice";
import { addToCart } from "../../services/cartService"
import cloudinaryOptimizer from "../../utils/cloudinaryOptimizer";
import { motion as Motion } from "framer-motion";

function ProductDetails() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  function handleIncrease() {
    setQuantity((prev) => prev + 1);
    if (quantity >= 10) {
      setQuantity(10);
    }
  }
  function handleDecrease() {
    setQuantity((prev) => prev - 1);
    if (quantity <= 1) {
      setQuantity(1);
    }
  }

  async function handleAddToCart() {
    dispatch(setLoading(true));
    try {
      const data = await addToCart(product._id, quantity);

      if (data) {
        toast.success("Product added to cart successfully!")
      }
    }
    catch (err) {
      toast.error("Failed to add product to cart!");
      dispatch(setError(err.message));
    }
    finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        if (data?.images && data.images.length > 0) {
          setMainImage(data.images[0].url);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }
    fetchProduct().finally(() => setPageLoading(false));
  }, [id]);

  if (pageLoading) return <div className="container mx-auto px-4 py-10">Loading...</div>;


  return (
    <Motion.section
      className="container mx-auto px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Section: Image Gallery */}
        <Motion.div
          className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Sidebar Thumbnails */}
          <div className="flex md:flex-col  gap-3 overflow-y-auto max-h-[500px]">
            {product?.images && product.images.length > 0 && product.images.map((img, index) => (
              <Motion.div onClick={() => setMainImage((img.url))}
                key={index}
                className={`w-20 h-20 overflow-hidden md:w-22 md:h-22 bg-gray-100  rounded-md flex items-center justify-center cursor-pointer border-[1px]  hover:border-red-500    transition-all duration-300 ${mainImage === img.url ? 'border-red-500' : 'border-gray-300'}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={loaded ? (cloudinaryOptimizer(product?.images[index].url)) : ImgPlaceholder}
                  alt={`Product Thumbnail ${index}`}
                  className="object-contain w-full h-full"
                  loading="lazy"
                  onLoad={() => setLoaded(true)}
                />
              </Motion.div>
            ))}
          </div>

          {/* Main Display Image */}
          <Motion.div
            className="flex-1  bg-gray-200 rounded-md flex items-center justify-center p-4 overflow-hidden h-[350px] md:h-[420px] "
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src={mainImage || (product?.images[0]?.url) || ImgPlaceholder}
              alt="Main Product"
              className="w-full h-full object-contain"
              loading="lazy"
              onLoad={() => setLoaded(true)}
            />
          </Motion.div>
        </Motion.div>

        {/* Right Section: Product Info & Actions */}
        <Motion.div
          className="w-full md:w-1/2 flex flex-col gap-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <Motion.h2
            className="text-2xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {product?.name}
          </Motion.h2>

          <Motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <RatingStars rating={4.5} reviews={150} />
            <span className="text-gray-300">|</span>
            <span className="text-green-500 text-sm font-medium">{product?.quantity > 0 ? "In Stock" : "Out of Stock"}</span>
          </Motion.div>

          <Motion.div
            className="mt-1 flex items-center gap-2 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <span className="font-bold text-[rgb(219,68,68)]">
              Rs.{product.discountedPrice ? product.discountedPrice : product.basePrice}
            </span>
            {product.basePrice && (
              <span className="text-xs text-gray-400 line-through">
                {product.basePrice}
              </span>
            )}
          </Motion.div>

          <Motion.p
            className="text-gray-600 text-sm leading-relaxed border-b pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {product?.description}
          </Motion.p>

          {/* Sub Category */}
          <Motion.div
            className="flex items-center gap-4 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.55 }}
          >
            <span className="text-lg">Category:</span>
            <div className="flex gap-2">
              <span className="text-green-700 text-lg font-[cursive] font-semibold ">{product?.SubCategory.name}</span>
            </div>
          </Motion.div>


          {/* Actions */}
          <Motion.div
            className="flex items-center gap-4 mt-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <QuantitySelector quantity={quantity} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
            <Button
              onClick={handleAddToCart}
              className="bg-[#DB4444] text-white px-10 py-2 rounded-md font-medium"
              text="Buy Now"
            />
              
                <Wish classList="border-[1px] border-black p-2 rounded-md" size={25} payload={product} />
          </Motion.div>

          {/* Delivery Info */}
          <Motion.div
            className="mt-6 border w-fit rounded-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex items-center gap-4 p-4 border-b">
              <Truck className="h-6 w-6" />
              <div>
                <p className="font-medium text-sm">Free Delivery</p>
                <p className="text-xs underline cursor-pointer">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <RotateCcw className="h-6 w-6" />
              <div>
                <p className="font-medium text-sm">Return Delivery</p>
                <p className="text-xs">
                  Free 30 Days Delivery Returns. <span className="underline cursor-pointer">Details</span>
                </p>
              </div>
            </div>
          </Motion.div>
          <Button onClick={() => navigate(-1)} text={"Go Back"} />
        </Motion.div>
      </div>
    </Motion.section>
  );
}

export default ProductDetails;
