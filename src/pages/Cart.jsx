import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart, increment, decrement, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0)
    return <h2 className="text-center text-amber-700 mt-10">🛒 Your cart is empty!</h2>;

  return (
    <div className="min-h-screen bg-[#fffaf3] text-gray-800 px-10 py-10">
      <h1 className="text-3xl font-bold text-amber-800 mb-6 text-center">Your Cart</h1>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {cart.map((item, idx) => (
          <div key={idx} className="flex items-center bg-white shadow-md rounded-xl p-4">
            <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
            <div className="ml-4 flex-1">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600">{item.region} • ₹{item.price}</p>
              <div className="mt-2 flex items-center gap-3">
                <button onClick={() => decrement(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span className="min-w-[24px] text-center">{item.quantity || 1}</span>
                <button onClick={() => increment(item.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                <span className="ml-4 text-sm text-gray-700">Line total: ₹{(item.price || 0) * (item.quantity || 1)}</span>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-xl font-semibold text-amber-700">Total: ₹{total}</p>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={() => navigate("/payment")} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            Proceed to Payment
          </button>
          <button onClick={clearCart} className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
