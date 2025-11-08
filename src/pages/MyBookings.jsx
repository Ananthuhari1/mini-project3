import React, { useEffect, useState } from "react";
import UserNavbar from "../components/UserNavbar";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("myBookings")) || [];
    setBookings(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <UserNavbar />

      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">📖 My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-600">You have no bookings yet.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((car, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md p-4 rounded-lg border flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full md:w-48 h-32 object-cover rounded-lg shadow"
                />
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">
                      {car.brand} {car.model}
                    </h3>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${car.status === "Cancelled by Admin"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"
                        }`}
                    >
                      {car.status || "Confirmed"}
                    </span>
                  </div>

                  <p>{car.location} | {car.fuelType} | ₹{car.pricePerDay}/day</p>
                  <p>Days: {car.days}</p>
                  <p className="font-semibold">Total: ₹{car.total}</p>
                  {car.status === "Cancelled by Admin" && (
                    <p className="mt-3 text-red-600 font-medium">
                      This booking was cancelled by owner. Amount will be refunded within 10 minutes.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
