import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import Footer from '../components/Footer';

export default function CarCard() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(55000);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const categories = ["All", "Sedan", "SUV", "Convertible", "Sports", "Electric"];

  useEffect(() => {
    const loadCars = async () => {
      try {
        const response = await fetch("/cars.json");
        const jsonCars = await response.json();
        const localEditedCars = JSON.parse(localStorage.getItem("editedCars")) || [];

        const mergedCars = [...localEditedCars];
        jsonCars.forEach((car) => {
          const exists = localEditedCars.find((c) => c.id === car.id);
          if (!exists) mergedCars.push(car);
        });

        setCars(mergedCars);
        setFilteredCars(mergedCars.slice(0, 12));
      } catch (err) {
        console.error("Error loading car data:", err);
      }
    };

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);

    loadCars();
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

  const handleRent = (car) => {
    const alreadyInCart = cart.some((item) => item.id === car.id);
    if (!alreadyInCart) {
      const updatedCart = [...cart, car];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    setShowCart(true);
  };

  const handleConfirmBooking = () => {
    alert("Booking Confirmed! We’ll contact you soon.");
    setCart([]);
    localStorage.removeItem("cart");
    setShowCart(false);
  };

  const handleWishlist = (car) => {
    const alreadyWishlisted = wishlist.some((item) => item.id === car.id);
    let updatedWishlist;
    if (alreadyWishlisted) {
      updatedWishlist = wishlist.filter((item) => item.id !== car.id);
    } else {
      updatedWishlist = [...wishlist, car];
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const isWishlisted = (carId) => {
    return wishlist.some((item) => item.id === carId);
  };

  if (showCart) {
    return (
      <Cart
        cart={cart}
        onConfirmBooking={handleConfirmBooking}
        onClose={() => setShowCart(false)}
      />
    );
  }

  return (
    <div className="max-w-7xl font-semibold mx-auto px-4 py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-4">
        <input
          type="text"
          placeholder="Search by car name or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-3 border border-gray-1000 rounded-full shadow-sm"
        />

        <button
          onClick={handleTopSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Search
        </button>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <div className="w-full bg-white border rounded-md shadow p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>

          <div className="mb-6">
            <label className="block font-medium mb-1 text-sm">
              Max Price: <span className="text-blue-600">₹{maxPrice}</span>
            </label>
            <input
              type="range"
              min="15000"
              max="55000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <h4 className="text-md font-semibold mb-2">Category</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs border ${selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleFilterSearch}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Apply Filters
          </button>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Available Cars</h2>
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <button
                  onClick={() => handleWishlist(car)}
                  className={`absolute top-1 right-1 p-1 rounded-full shadow transition ${isWishlisted(car.id)
                      ? "bg-red-500 text-white"
                      : "bg-white text-red-500 hover:bg-red-100"
                    }`}
                  title={isWishlisted(car.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  ❤️
                </button>

                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 text-sm">
                  <p className="font-semibold leading-tight line-clamp-2">
                    {car.brand} {car.model}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
                      4.{Math.floor(Math.random() * 5) + 1} ★
                    </span>
                    <span className="text-gray-500 text-xs">
                      ({Math.floor(Math.random() * 50000)})
                    </span>
                  </div>

                  <div className="mt-2 space-y-1">
                    <p className="text-green-700 font-bold text-lg">
                      ₹{car.pricePerDay}
                    </p>
                    <p className="text-xs text-gray-500 line-through">
                      ₹{car.pricePerDay + 1500}
                    </p>
                    <p className="text-xs text-green-600">Save extra 10%</p>
                  </div>

                  <button
                    onClick={() => handleRent(car)}
                    className="mt-3 w-full bg-indigo-600 text-white py-1.5 rounded hover:bg-indigo-700 transition text-sm"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8">
            No cars match your search/filter criteria.
          </p>
        )}
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
}
