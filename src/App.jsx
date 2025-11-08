import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import AdminPanel from "./pages/AdminPanel";
import UserPanel from "./pages/UserPanel";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CarCard from "./pages/CarCard";
import MyBookings from "./pages/MyBookings";
import Userprofile from "./pages/Userprofile";
import PaymentPage from "./pages/PaymentPage";
import AdminProfile from "./pages/AdminProfile";
import EditProduct from "./pages/EditProduct";
import AdminCard from "./pages/AdminCard";
import AddProducts from "./pages/AddProducts";
import Orders from "./pages/Orders";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Reviews from "./pages/Reviews";

function RootFile() {
  const location = useLocation();

  const hideNavbarPaths = ["/userpanel", "/adminpanel", "/loginpage", "/registrationpage"];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="container mx-auto px-4 py-6 " >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registrationpage" element={<RegistrationPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/userpanel" element={<UserPanel />} />
          <Route path="/carcard" element={<CarCard />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/editproduct" element={<EditProduct />} />
          <Route path="/admincard" element={<AdminCard />} />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RootFile />
    </BrowserRouter>
  );
}
