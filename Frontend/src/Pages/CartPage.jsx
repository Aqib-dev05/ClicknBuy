import React from 'react'
import CartList from '../Components/cart/CartList';
import CartTotalCalc from '../Components/cart/CartTotalCalc';

function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartList />
          </div>
          
          <div className="lg:col-span-1">
            <CartTotalCalc />
          </div>
        </div>
      </div>
    </div>
  );
}


export default CartPage