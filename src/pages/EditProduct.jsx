import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProduct() {
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCar = localStorage.getItem("editCar");
    if (storedCar) {
      setCar(JSON.parse(storedCar));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCar((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const savedCars = JSON.parse(localStorage.getItem("editedCars")) || [];
    const updatedCars = savedCars.map((item) =>
      item.id === car.id ? car : item
    );
    localStorage.setItem("editedCars", JSON.stringify(updatedCars));
    navigate("/admincard");
  };

  if (!car) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-2xl mt-15 mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Car Details</h2>
      <div className="flex flex-col gap-4">
        <label className="block">
          <span className="text-gray-700">Image</span>
          <img
            src={car.image}
            alt="Car"
            className="w-full h-48 object-cover rounded mb-2 cursor-pointer"
            onClick={() => document.getElementById("imageUpload").click()}
          />
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {Object.entries(car).map(([key, value]) => {
          if (key === "id" || key === "image") return null;
          return (
            <label key={key} className="block">
              <span className="text-gray-700 capitalize">{key}</span>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded"
              />
            </label>
          );
        })}

        <button
          onClick={handleSave}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

