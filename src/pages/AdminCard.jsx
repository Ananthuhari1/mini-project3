import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";


export default function AdminCard() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(55000);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();
  const categories = ["All", "Sedan", "SUV", "Convertible", "Sports", "Electric"];

  useEffect(() => {
    const savedCars = localStorage.getItem("editedCars");
    if (savedCars) {
      const data = JSON.parse(savedCars);
      setCars(data);
      setFilteredCars(data.slice(0, 12));
    } else {
      fetch("/cars.json")
        .then((res) => res.json())
        .then((data) => {
          setCars(data);
          setFilteredCars(data.slice(0, 12));
        })
        .catch((err) => console.error("Error loading JSON:", err));
    }
  }, []);

  const handleTopSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = cars.filter(
      (car) =>
        car.model.toLowerCase().includes(query) ||
        car.location.toLowerCase().includes(query)
    );
    setFilteredCars(filtered.slice(0, 12));
  };

  const handleFilterSearch = () => {
    let results = cars;
    if (selectedCategory !== "All") {
      results = results.filter((car) => car.category === selectedCategory);
    }
    results = results.filter((car) => car.pricePerDay <= maxPrice);
    setFilteredCars(results.slice(0, 12));
  };

  const handleEditRedirect = (car) => {
    localStorage.setItem("editCar", JSON.stringify(car));
    navigate("/editproduct");
  };
  return (
    <div className="w-full p-4 mt-15 ">
      <AdminNavbar />
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search by car name or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border border-gray-300 rounded-full w-full md:w-3/3"
        />
        <button
          onClick={handleTopSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 w-full md:w-auto"
        >
          Search
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/4">
          <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">Manage Cars</h2>
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all"
                >
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-xl font-semibold">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-sm text-gray-500">{car.category} - {car.year}</p>
                  <p className="text-sm text-gray-600">📍 {car.location}</p>
                  <p className="mt-2 text-green-600 font-bold">₹{car.pricePerDay} / day</p>
                  <p className="text-xs text-gray-500 mb-2">
                    Fuel: {car.fuelType} | Seats: {car.seating} | {car.transmission}
                  </p>
                  <button
                    onClick={() => handleEditRedirect(car)}
                    className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8">No cars match your search/filter criteria.</p>
          )}
        </div>

        <div className="w-full mt-12 lg:w-1/4 bg-white rounded-lg p-4 shadow-sm h-fit">
          <h3 className="text-xl font-semibold mb-4">Filters</h3>

          <label className="block font-medium mb-1">Max Price: ₹{maxPrice}</label>
          <input
            type="range"
            min="15000"
            max="55000"
            step="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="w-full mb-6"
          />

          <h4 className="text-lg font-semibold mb-2">Category</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded text-sm ${selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={handleFilterSearch}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

