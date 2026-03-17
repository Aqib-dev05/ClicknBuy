import React from 'react';
import { useSelector } from 'react-redux';

const CartTotalCalc = () => {
  const { items } = useSelector((state) => state.cart);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100 || items.length === 0 ? 0 : 10.0;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
      
      <div className="space-y-3 border-b pb-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600 font-semibold">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Estimated Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 mb-6">
        <span className="text-lg font-bold text-gray-800">Total</span>
        <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
      </div>

      <button 
        disabled={items.length === 0}
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          items.length === 0 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        Proceed to Checkout
      </button>
      
      {subtotal < 100 && items.length > 0 && (
        <p className="mt-4 text-sm text-gray-500 text-center">
          Add <span className="font-bold">${(100 - subtotal).toFixed(2)}</span> more to your cart for <span className="text-green-600 font-semibold">Free Shipping</span>!
        </p>
      )}
    </div>
  );
};

export default CartTotalCalc;
