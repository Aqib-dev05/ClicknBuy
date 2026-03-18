import React from "react";



export default function QuantitySelector({quantity,handleDecrease,handleIncrease}) {
 

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
