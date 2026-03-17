import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm rounded-lg mb-4">
      <div className="flex items-center space-x-4">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center border rounded-md">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 font-medium">{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="text-right min-w-[80px]">
          <p className="font-bold text-blue-600">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <button 
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 p-2 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
