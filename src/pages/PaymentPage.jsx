import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pendingBooking")) || [];
    setBookings(data);
  }, []);

  const totalAmount = bookings.reduce((sum, b) => sum + b.total, 0);

  const handlePayment = () => {
    const allBookings = JSON.parse(localStorage.getItem("myBookings")) || [];
    const updatedBookings = [...allBookings, ...bookings];
    localStorage.setItem("myBookings", JSON.stringify(updatedBookings));
    localStorage.removeItem("pendingBooking");
    navigate("/mybookings");
  };

  return (
    <div className="max-w-3xl mx-auto mt-15 p-6">
      <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>

      <div className="space-y-4 mb-6">
        {bookings.map((car, idx) => (
          <div key={idx} className="border p-4 rounded shadow">
            <p><strong>{car.brand} {car.model}</strong></p>
            <p>{car.location} | {car.fuelType} | ₹{car.pricePerDay}/day</p>
            <p>Days: {car.days}</p>
            <p className="font-semibold">Subtotal: ₹{car.total}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Select Payment Method:</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit/Debit Card
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI (Google Pay / PhonePe)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="wallet"
              checked={paymentMethod === "wallet"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Wallet (Paytm / Amazon Pay)
          </label>
        </div>
      </div>

      <div className="text-right font-bold text-xl mb-4">
        Total Amount: ₹{totalAmount}
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Pay Now
      </button>
    </div>
  );
};

