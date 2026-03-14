import React from "react";
import { useState } from "react";
export default function QuantitySelector() {
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

  return (
    <span className="border-black border-2 rounded-sm flex gap-4 items-center justify-center text-lg font-medium w-fit">
      <button
        onClick={handleDecrease}
        className="border-black py-1 hover:bg-red-500 hover:text-white cursor-pointer px-3 border-r-2"
      >
        -
      </button>
      <span className="px-4 py-1">{quantity}</span>
      <button
        onClick={handleIncrease}
        className="border-black py-1 hover:bg-red-500 hover:text-white cursor-pointer px-3 border-l-2"
      >
        +
      </button>
    </span>
  );
}
