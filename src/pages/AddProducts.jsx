import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";

export default function AddProducts() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    brand: "",
    model: "",
    category: "",
    year: "",
    location: "",
    pricePerDay: "",
    fuelType: "",
    transmission: "",
    seating: "",
    image: ""
  });

  const categories = ["SUV", "Sedan", "Hatchback", "Convertible",];
  const years = Array.from({ length: 20 }, (_, i) => (2025 - i).toString());
  const locations = ["Kasaragod", "Kannur", "Kozhikode", "Wayanad", "Malappuram", "Thrissur", "Ernakulam", "Kottayam", "Idukki", "Palakkad", "Pathanamthitta", "Alappuzha", "Kollam", "Thiruvananthapuram"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const transmissions = ["Manual", "Automatic"];
  const seatings = ["2", "4", "5", "6", "7", "8"];

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem("editedCars")) || [];
    setCars(savedCars);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    const isEmpty = Object.values(form).some((val) => val === "");
    if (isEmpty) {
      alert("Please fill in all fields including image.");
      return;
    }

    const newCar = {
      ...form,
      id: Date.now(),
      pricePerDay: parseFloat(form.pricePerDay),
      year: parseInt(form.year),
      seating: parseInt(form.seating)
    };

    const updatedCars = [...cars, newCar];
    setCars(updatedCars);
    localStorage.setItem("editedCars", JSON.stringify(updatedCars));

    setForm({
      brand: "",
      model: "",
      category: "",
      year: "",
      location: "",
      pricePerDay: "",
      fuelType: "",
      transmission: "",
      seating: "",
      image: ""
    });
  };
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gray-200 mt-15">
      <AdminNavbar />
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Car</h2>

      <div className="bg-white shadow rounded-md p-6 mb-10">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Car Photo</label>
          <div className="border-dashed border-2 border-gray-300 p-4 rounded flex flex-col items-center justify-center">
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mb-2 h-24 object-cover rounded"
              />
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(form).map(([key, value]) => {
            if (key === "image") return null;

            let options = [];

            switch (key) {
              case "category":
                options = categories;
                break;
              case "year":
                options = years;
                break;
              case "location":
                options = locations;
                break;
              case "fuelType":
                options = fuelTypes;
                break;
              case "transmission":
                options = transmissions;
                break;
              case "seating":
                options = seatings;
                break;
              default:
                options = null;
            }

            return options ? (
              <select
                key={key}
                name={key}
                value={value}
                onChange={handleChange}
                className="border px-4 py-2 rounded"
              >
                <option value="">Select {key.charAt(0).toUpperCase() + key.slice(1)}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                key={key}
                type="text"
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
                onChange={handleChange}
                className="border px-4 py-2 rounded"
              />
            );
          })}
        </div>

        <button
          onClick={handleAddProduct}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Add Car
        </button>
      </div>

      <div className="bg-white shadow rounded p-6">
        <h3 className="text-xl font-semibold mb-4">Cars List</h3>

        {cars.length === 0 ? (
          <p className="text-gray-500">No cars added yet.</p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full table-auto border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left border">Image</th>
                  <th className="px-4 py-2 text-left border">Brand</th>
                  <th className="px-4 py-2 text-left border">Model</th>
                  <th className="px-4 py-2 text-left border">Category</th>
                  <th className="px-4 py-2 text-left border">Year</th>
                  <th className="px-4 py-2 text-left border">Price (₹/day)</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      <img
                        src={car.image}
                        alt={car.model}
                        className="h-12 w-20 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2 border">{car.brand}</td>
                    <td className="px-4 py-2 border">{car.model}</td>
                    <td className="px-4 py-2 border">{car.category}</td>
                    <td className="px-4 py-2 border">{car.year}</td>
                    <td className="px-4 py-2 border">₹{car.pricePerDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
