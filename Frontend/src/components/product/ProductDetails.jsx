import React from "react";
import RatingStars from "./RatingStars";
import QuantitySelector from "./QuantitySelector";
import { Heart, Truck, RotateCcw } from "lucide-react";
import Button from "../layouts/Button";

function ProductDetails() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Section: Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-1/2">
          {/* Sidebar Thumbnails */}
          <div className="flex md:flex-col  gap-3 overflow-y-auto max-h-[500px]">
            {[1, 2, 3, 4].map((img, index) => (
              <div
                key={index}
                className="w-20 h-20 md:w-22 md:h-22 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer hover:border-red-500 border-2 border-transparent transition"
              >
                <img
                  src="https://via.placeholder.com/100"
                  alt={`Thumbnail ${index}`}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Main Display Image */}
          <div className="flex-1 bg-gray-100 rounded-md flex items-center justify-center p-8 min-h-[400px]">
            <img
              src="https://via.placeholder.com/400"
              alt="Main Product"
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Section: Product Info & Actions */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Havic HV G-92 Gamepad</h2>

          <div className="flex items-center gap-4">
            <RatingStars rating={4.5} reviews={150} />
            <span className="text-gray-300">|</span>
            <span className="text-green-500 text-sm font-medium">In Stock</span>
          </div>

          <div className="text-2xl font-semibold text-gray-900">$192.00</div>

          <p className="text-gray-600 text-sm leading-relaxed border-b pb-6">
            PlayStation 5 Controller Features with immersive haptic feedback, dynamic adaptive triggers and a built-in microphone, all integrated into an iconic design.
          </p>

          {/* Colors/Variants */}
          {/* <div className="flex items-center gap-4 mt-2">
            <span className="text-lg">Colours:</span>
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-400 cursor-pointer border-2 border-black"></div>
              <div className="w-4 h-4 rounded-full bg-red-500 cursor-pointer"></div>
            </div>
          </div> */}

          {/* Size Selector */}
          {/* <div className="flex items-center gap-4 mt-2">
            <span className="text-lg">Size:</span>
            <div className="flex gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button key={size} className="border rounded-md px-3 py-1 text-sm hover:bg-red-500 hover:text-white transition">
                  {size}
                </button>
              ))}
            </div>
          </div> */}

          {/* Sub Category */}
          <div className="flex items-center gap-4 mt-2">
            <span className="text-lg">Category:</span>
            <div className="flex gap-2">
              <span className="text-gray-600">Electronics</span>
            </div>
          </div>


          {/* Actions */}
          <div className="flex items-center gap-4 mt-4">
            <QuantitySelector />
            <Button 
              className="bg-[#DB4444] text-white px-10 py-2 rounded-md font-medium"
              text="Buy Now"
            />
            <button className="border p-2 rounded-md hover:bg-gray-50">
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="mt-6 border w-fit rounded-md">
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
