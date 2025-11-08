import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

export default function Cart() {
  const [carDetails, setCarDetails] = useState([]);
  const [rentalDays, setRentalDays] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    fetch("/cars.json")
      .then((res) => res.json())
      .then((data) => {
        const filteredCars = data.filter((car) =>
          storedCart.some((c) => c.id === car.id)
        );
        setCarDetails(filteredCars);

        const initialDays = {};
        filteredCars.forEach((car) => {
          initialDays[car.id] = 1;
        });
        setRentalDays(initialDays);
      });
  }, []);

  const handleDayChange = (carId, delta) => {
    setRentalDays((prev) => ({
      ...prev,
      [carId]: Math.max(1, (prev[carId] || 1) + delta),
    }));
  };

  const handleConfirmBooking = () => {
    const bookingData = carDetails.map((car) => ({
      ...car,
      days: rentalDays[car.id],
      total: rentalDays[car.id] * car.pricePerDay,
      bookingDate: new Date().toISOString(),
    }));
    localStorage.setItem("pendingBooking", JSON.stringify(bookingData));

    alert("✅ Booking confirmed! Redirecting to payment...");

    setTimeout(() => {
      navigate("/payment");
    }, 1000);
  };

  const totalPrice = carDetails.reduce((sum, car) => {
    const days = rentalDays[car.id] || 1;
    return sum + car.pricePerDay * days;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <UserNavbar />
      <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>

      {carDetails.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        carDetails.map((car) => (
          <div
            key={car.id}
            className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={car.image}
                alt={car.model}
                className="w-72 h-56 object-cover rounded"
              />
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {car.brand} {car.model} ({car.year})
                </h3>
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded">
                    4.{Math.floor(Math.random() * 5) + 1} ★
                  </span>
                  <span className="text-gray-600">
                    {Math.floor(Math.random() * 10000)} Ratings & Reviews
                  </span>
                  <img
                    src="https://img.icons8.com/color/48/assured.png"
                    alt="Assured"
                    className="h-4 w-4"
                  />
                </div>
              </div>

              <div className="text-gray-700 text-sm space-y-1">
                <p>📍 <strong>Location:</strong> {car.location}</p>
                <p>🚗 <strong>Category:</strong> {car.category}</p>
                <p>⛽ <strong>Fuel Type:</strong> {car.fuelType}</p>
                <p>⚙️ <strong>Transmission:</strong> {car.transmission}</p>
                <p>👥 <strong>Seating:</strong> {car.seating}</p>
              </div>

              <div className="text-lg font-semibold text-green-700">
                ₹{car.pricePerDay} / day
              </div>
              <div className="text-sm text-gray-500 line-through">
                ₹{car.pricePerDay + 1500}
              </div>
              <p className="text-sm text-green-600">Extra ₹1500 off</p>

              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm font-medium">Days:</span>
                <button
                  onClick={() => handleDayChange(car.id, -1)}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  -
                </button>
                <span>{rentalDays[car.id]}</span>
                <button
                  onClick={() => handleDayChange(car.id, 1)}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  +
                </button>
              </div>

              <div className="font-bold text-black text-xl mt-2">
                Subtotal: ₹{car.pricePerDay * rentalDays[car.id]} /-
              </div>
            </div>
          </div>
        ))
      )}

      {carDetails.length > 0 && (
        <div className="mt-8">
          <div className="text-right text-xl font-semibold text-gray-800">
            Total: ₹{totalPrice.toFixed(2)} /-
          </div>
          <button
            onClick={handleConfirmBooking}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white w-full py-3 rounded font-semibold"
          >
            ⚡ Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
}
