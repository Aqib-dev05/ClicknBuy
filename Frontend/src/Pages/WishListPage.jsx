import React, { useState, useEffect } from "react";
import ProductCard from "../Components/product/ProductCard";
import Button from "../Components/layouts/Button";
import { useNavigate } from "react-router-dom";
import { bulkInsertion } from "../services/cartService.js";
import { toast } from "react-toastify";
import { HashLoader, PulseLoader } from "react-spinners"
import { motion as Motion } from "framer-motion";


function WishListPage() {

  const navigate = useNavigate();
  const [wishedProducts, setWishedProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)

  useEffect(() => {
    async function localFetch() {
      try {
        setLoading(true)
        const items = await JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishedProducts(items);

      } catch (err) {
        console.log(err)
      }
      finally {
        setLoading(false)
      }
    }
    localFetch();
  }, []);

  async function handleCartInsertion() {

    if (wishedProducts.length === 0) {
      toast.info("Your wishlist is empty!");
      return;
    };

    let productIds = wishedProducts.map((item) => item._id);


    try {
      setBtnLoading(true);
      const res = await bulkInsertion(JSON.stringify(productIds));

      if (res) {
        toast.success("Products added to cart successfully!");
        localStorage.removeItem("wishlist");
        setWishedProducts([]);
        console.log(res)
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to add products to cart";
      toast.error(message);
    } finally {
      setBtnLoading(false)
    }

  }


  return (
    <Motion.div
      className="max-w-7xl mx-auto py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-2xl font-medium">
          Wishlist ({wishedProducts.length})
        </h1>
        <Button
          text={btnLoading ? <PulseLoader color="#fff" /> : "Move All To Bag"}
          onClick={handleCartInsertion}
          className="border border-gray-300 px-6 py-2 rounded"
        />
      </Motion.div>

      {
        loading ? <HashLoader /> :

          wishedProducts.length > 0 ? (
            <Motion.div
              className=" flex flex-wrap gap-6 px-4 py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {wishedProducts.map((item) => (
                <ProductCard key={item._id} payload={item} />
              ))}
            </Motion.div>
          ) : (
            <Motion.div
              className="flex flex-col items-center justify-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
              <Button
                text="  Return To Shop"
                className="mt-4 bg-[#DB4444] text-white px-8 py-2 rounded"
                onClick={() => navigate('/products')}
              />
            </Motion.div>
          )}
    </Motion.div>
  );
}

export default WishListPage;
