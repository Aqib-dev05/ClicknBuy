import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../product/ProductCard";
import Button from "../layouts/Button";

function WishListPage() {
  const { product } = useSelector((state) => state.products);
  const {wishlist} = useSelector((state) => state.wishlist);
  
  const wishedProducts = product?.products?.filter((item) =>
    wishlist.includes(item._id)
  ) || [];

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium">
          Wishlist ({wishedProducts.length})
        </h1>
        <Button
          text="Move All To Bag"
          className="border border-gray-300 px-6 py-2 rounded"
        />
      </div>

      {wishedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            onClick={() => window.location.href = "/"}
          />
        </div>
      )}
    </div>
  );
}

export default WishListPage;
