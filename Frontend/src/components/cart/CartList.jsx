import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { ShoppingBag } from 'lucide-react';

const CartList = () => {
  const { items } = useSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <ShoppingBag size={48} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-medium text-gray-600">Your cart is empty</h2>
        <p className="text-gray-400 mt-2">Add some items to your cart to see them here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
          {items.length} {items.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>
      <div className="max-h-[600px] overflow-y-auto pr-2">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CartList;
