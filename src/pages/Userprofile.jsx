import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from '../components/UserNavbar';

export default function UserProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    photo: "",
    frontLicense: null,
    backLicense: null,
  });

  const fileInputAvatar = useRef(null);
  const fileInputFront = useRef(null);
  const fileInputBack = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user")) || {};
    setFormData(data);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        photo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e, side) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        [side]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    alert("Changes saved!");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 mt-15">
      <UserNavbar />
      <div className="bg-white shadow-md w-full lg:w-1/4 p-4 flex flex-col items-center">
        <img
          src={formData.photo || "/avatar.avif"}
          alt=""
          className="w-20 h-20 rounded-full object-cover border-2"
        />
        <p className="text-sm font-semibold mt-2">{formData.name || "complete your profile details"}</p>

        <div className="w-full space-y-2 mt-6 text-left">
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
            📄 My Profile
          </button>

          <a href="/mybookings" className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
            📦 Bookings
          </a>

          <a href="/wishlist" className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
            ❤️ My Wishlist
          </a>

          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
            📃 Terms & Conditions
          </button>

          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
            🔒 Privacy Policy
          </button>

          <a href="/loginpage" className="block w-full text-left px-4 py-2 hover:bg-red-100 rounded text-red-500">
            🚪 Logout
          </a>
        </div>

      </div>

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

        <div className="bg-white p-6 rounded shadow space-y-4">

          <div className="flex items-center space-x-4 mb-6">
            <div
              className="relative w-20 h-20"
              onClick={() => fileInputAvatar.current.click()}
            >
              <img
                src={formData.photo || "/avatar.avif"}
                alt=""
                className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 shadow cursor-pointer"
              />
              <div className="absolute bottom-0 right-0 bg-white border rounded-full p-1 shadow">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828V7h-2.828z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 13v6a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h6"
                  />
                </svg>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputAvatar}
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Driving License</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => fileInputFront.current.click()}
                className="border border-dashed border-gray-400 h-40 flex items-center justify-center text-gray-500 text-sm rounded cursor-pointer"
              >
                {formData.frontLicense ? (
                  <img src={formData.frontLicense} alt="Front" className="h-full object-contain" />
                ) : (
                  "Click here to upload the front side of your driving license."
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputFront}
                  onChange={(e) => handleFileChange(e, "frontLicense")}
                  className="hidden"
                />
              </div>

              <div
                onClick={() => fileInputBack.current.click()}
                className="border border-dashed border-gray-400 h-40 flex items-center justify-center text-gray-500 text-sm rounded cursor-pointer"
              >
                {formData.backLicense ? (
                  <img src={formData.backLicense} alt="Back" className="h-full object-contain" />
                ) : (
                  "Click here to upload the back side of your driving license."
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputBack}
                  onChange={(e) => handleFileChange(e, "backLicense")}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSave}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
