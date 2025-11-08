import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminProfile() {
  const [admin, setAdmin] = useState({
    name: "Admin",
    email: "admin@example.com",
    location: "Head Office",
    photo: "/images/admin-avatar.png",
    dob: "1990-12-10",
    phone: "+91 9876543210",
    country: "India",
    city: "Chennai",
    postalCode: "600001"
  });

  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("admin"));
    if (data) setAdmin(data);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("admin", JSON.stringify(admin));
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAdmin((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleClearLocalStorage = () => {
    if (window.confirm("Are you sure you want to clear ALL data?")) {
      localStorage.clear();
      navigate("/loginpage");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <AdminNavbar />

      <div className="max-w-5xl mx-auto mt-10 space-y-6">

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6">
          <div>
            <img
              src={"/avatar.avif"}
              alt=""
              onClick={() => fileInputRef.current.click()}
              className="w-24 h-24 rounded-full object-cover cursor-pointer border-4 border-blue-500"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{admin.name}</h2>
            <p className="text-gray-600">Admin</p>
            <p className="text-gray-500">{admin.location}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <button
              className="text-orange-500 hover:text-orange-700"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit
            </button>
          </div>

          {isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="name"
                value={admin.name}
                onChange={handleChange}
                placeholder="First Name"
                className="border p-2 rounded"
              />
              <input
                name="dob"
                value={admin.dob}
                onChange={handleChange}
                type="date"
                className="border p-2 rounded"
              />
              <input
                name="email"
                value={admin.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="border p-2 rounded"
              />
              <input
                name="phone"
                value={admin.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border p-2 rounded"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <p><strong>First Name:</strong> {admin.name}</p>
              <p><strong>Date of Birth:</strong> {admin.dob}</p>
              <p><strong>Email Address:</strong> {admin.email}</p>
              <p><strong>Phone Number:</strong> {admin.phone}</p>
              <p><strong>User Role:</strong> Admin</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Address</h3>
            <button
              className="text-orange-500 hover:text-orange-700"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit
            </button>
          </div>

          {isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                name="country"
                value={admin.country}
                onChange={handleChange}
                placeholder="Country"
                className="border p-2 rounded"
              />
              <input
                name="city"
                value={admin.city}
                onChange={handleChange}
                placeholder="City"
                className="border p-2 rounded"
              />
              <input
                name="postalCode"
                value={admin.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                className="border p-2 rounded"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700">
              <p><strong>Country:</strong> {admin.country}</p>
              <p><strong>City:</strong> {admin.city}</p>
              <p><strong>Postal Code:</strong> {admin.postalCode}</p>
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/loginpage")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
          <button
            onClick={handleClearLocalStorage}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}
