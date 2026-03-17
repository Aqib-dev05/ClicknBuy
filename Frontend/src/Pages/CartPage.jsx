import React from 'react'
import CartList from '../Components/cart/CartList';
import CartTotalCalc from '../Components/cart/CartTotalCalc';

function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl max-md:text-xl font-extrabold text-gray-900 mb-2 font-mono">Your Shopping Cart</h1>
        
        <div className="">
          <div className="">
            <CartList />
          </div>
          
          <div className="">
            <CartTotalCalc />
          </div>
        </div>
      </div>
    </div>
  );
}


export default CartPage