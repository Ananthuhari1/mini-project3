import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { FaMoneyCheckAlt, FaHeadset, FaRoad } from "react-icons/fa";

export default function Home() {
  const images = [
    "/photo-1552519507-da3b142c6e3d.avif",
    "/josh-berquist-_4sWbzH5fp8-unsplash.jpg",
    "/lance-asper-Wl6OeSGyOf4-unsplash.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const features = [
    {
      title: "No Security Deposit",
      desc: "Drive stress-free with 0 upfront fee.",
      icon: <FaMoneyCheckAlt className="text-green-600 text-4xl mb-3 mx-auto" />,
    },
    {
      title: "24/7 Support",
      desc: "We're here for you anytime, anywhere.",
      icon: <FaHeadset className="text-green-600 text-4xl mb-3 mx-auto" />,
    },
    {
      title: "Unlimited KMs",
      desc: "Drive as much as you want.",
      icon: <FaRoad className="text-green-600 text-4xl mb-3 mx-auto" />,
    },
  ];

  return (
    <div className="mt-15">
      <section
        className="bg-cover bg-center text-white flex flex-col justify-center items-center text-center px-4 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          minHeight: "65vh",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow">
          Self-Drive Luxury Car Rentals
        </h1>
        <p className="text-lg md:text-xl mb-6 drop-shadow">
          Rent a car, No deposit, Unlimited kms.
        </p>
        <a
          href="/registrationpage"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-xl"
        >
          Search Cars
        </a>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              {item.icon}
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8 text-green-700">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {[
            ["Choose Your Car", "Browse and select from our luxury fleet."],
            ["Book Instantly", "No deposit, simple online booking."],
            ["Enjoy the Drive", "Unlimited kms, smooth experience."],
          ].map(([title, desc], i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-gray-50 shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-green-600">
                {title}
              </h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-700">
          Popular Picks
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {[
            {
              name: "Bentley continental gt",
              img: "/carimages/bentley-continental-gt.jpeg",
            },
            {
              name: "Ferrari roma",
              img: "/carimages/ferrari-roma.jpeg",
              
            },
            {
              name: "Jaguar-f-pace",
              img: "/carimages/jaguar-f-pace.jpeg",
              
            },
          ].map((car, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={car.img}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-green-700">
                  {car.name}
                </h3>
                <p className="text-gray-600">{car.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {[
            [
              "Gokul K.",
              "DreamDrive made my trip memorable. Highly recommend!",
            ],
            [
              "Ananya M.",
              "Clean cars, no deposit, unlimited drive – awesome!",
            ],
            [
              "Ravi P.",
              "Booked an Audi in 5 mins. Support team was great!",
            ],
          ].map(([name, review], i) => (
            <div key={i} className="bg-green-50 p-6 rounded-xl shadow">
              <p className="italic text-gray-700 mb-2">"{review}"</p>
              <h4 className="font-bold text-green-800">{name}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-green-200 via-green-600 to-green-200 text-white text-center rounded-3xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Ride in Style?</h2>
        <p className="text-lg mb-6">
          Sign up and book your luxury ride now!
        </p>
        <a
          href="/registrationpage"
          className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
        >
          Get Started
        </a>
      </section>
<div className="mt-5">
     <Footer />
</div>
    </div>
  );
}
