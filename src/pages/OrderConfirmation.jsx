import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

export default function OrderConfirmation() {
  const { id } = useParams();
  const order = useMemo(() => {
    const list = JSON.parse(localStorage.getItem("orders") || "[]");
    return list.find((o) => String(o.id) === String(id));
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf3] px-6">
        <h1 className="text-2xl font-bold text-red-600">Order not found</h1>
        <Link to="/" className="mt-4 text-amber-700 underline">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf3] px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold text-amber-800 text-center">Thank you for your purchase!</h1>
        <p className="text-center text-gray-600 mt-2">Your order has been placed successfully.</p>

        <div className="mt-6 bg-[#fff8e7] rounded-xl p-4">
          <p className="text-gray-700"><span className="font-semibold">Order ID:</span> {order.id}</p>
          <p className="text-gray-700"><span className="font-semibold">Total:</span> ₹{order.total}</p>
          <p className="text-gray-700"><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</p>
        </div>

        <h2 className="mt-6 text-xl font-semibold text-amber-700">Items</h2>
        <div className="mt-3 space-y-3">
          {order.items.map((it) => (
            <div key={`${it.id}-${it.name}`} className="flex items-center gap-3">
              {it.image ? (
                <img src={it.image} alt={it.name} className="h-16 w-16 rounded object-cover" />
              ) : (
                <div className="h-16 w-16 bg-gray-100 rounded" />
              )}
              <div className="flex-1">
                <p className="font-medium">{it.name}</p>
                <p className="text-sm text-gray-600">Qty: {it.quantity || 1} • ₹{it.price}</p>
              </div>
              <div className="font-semibold">₹{(it.price || 0) * (it.quantity || 1)}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/dashboard/user" className="px-5 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Go to Dashboard</Link>
          <Link to="/explore" className="px-5 py-2 rounded-lg border-2 border-amber-600 text-amber-700 hover:bg-amber-50">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
