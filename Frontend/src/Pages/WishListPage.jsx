import React, { useState, useEffect } from "react";
import ProductCard from "../Components/product/ProductCard";
import Button from "../Components/layouts/Button";
import { useNavigate } from "react-router-dom";
import { bulkInsertion } from "../services/cartService.js";
import { toast } from "react-toastify";

function WishListPage() {

  const navigate = useNavigate();
  const [wishedProducts, setWishedProducts] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishedProducts(items);
  }, []);

  async function handleCartInsertion() {

    if (wishedProducts.length === 0) {
      toast.info("Your wishlist is empty!");
      return;
    };

    let productIds = wishedProducts.map((item) => item._id);

    try {
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
    }

  }


  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium">
          Wishlist ({wishedProducts.length})
        </h1>
        <Button
          text="Move All To Bag"
          onClick={handleCartInsertion}
          className="border border-gray-300 px-6 py-2 rounded"
        />
      </div>

      {wishedProducts.length > 0 ? (
        <div className=" flex flex-wrap gap-6 px-4 py-8">
          {wishedProducts.map((item) => (
            <ProductCard key={item._id} payload={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
          <Button
            text="  Return To Shop"
            className="mt-4 bg-[#DB4444] text-white px-8 py-2 rounded"
            onClick={() => navigate('/products')}
          />
        </div>
      )}
    </div>
  );
}

export default WishListPage;
