import React, { useEffect, useState } from "react";
import { CreditCard, CheckCircle } from "lucide-react";

function Payment() {
  const [item, setItem] = useState(null);
  const [method, setMethod] = useState("UPI");
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("buyNowItem");
    if (data) setItem(JSON.parse(data));
  }, []);

  const handlePayment = () => {
    setPaid(true);
    localStorage.removeItem("buyNowItem");
    setTimeout(() => alert("✅ Payment Successful!"), 500);
  };

  if (!item)
    return (
      <h2 className="text-center mt-20 text-red-600">
        No item selected for payment.
      </h2>
    );

  return (
    <div className="min-h-screen bg-[#fffaf3] flex justify-center items-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-amber-800 mb-8">
          Secure Payment
        </h1>

        {/* Item Summary */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 rounded-xl object-cover shadow-md"
          />
          <div>
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.region}</p>
            <p className="text-amber-700 font-bold text-lg mt-1">
              ₹{item.price}
            </p>
          </div>
        </div>

        {/* Payment Method */}
        <label className="block font-semibold mb-2 text-gray-700">
          Choose Payment Method
        </label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full border border-amber-400 rounded-lg px-4 py-2 mb-6 focus:ring-2 focus:ring-amber-500 outline-none"
        >
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold flex justify-center items-center gap-2 transition"
        >
          <CreditCard size={20} /> Pay ₹{item.price}
        </button>

        {/* Success Message */}
        {paid && (
          <div className="mt-6 flex flex-col items-center text-green-700">
            <CheckCircle size={40} />
            <p className="mt-2 font-semibold text-lg">Payment Successful!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
