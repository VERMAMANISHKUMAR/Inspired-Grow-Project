import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserLogin from "./pages/UserLogin";
import CustomerOrders from "./pages/CustomerOrders";
import Booking from './components/Booking/BookingOrder';
import ItemOrderPage from "./components/Order/ItemOrderPage";
import ProductCard from "./components/Product/ProductCard";
import AddDeliveryBoy from "./components/AddDelveryBoy/AddDeliveryBoy";
import DeliveryBoyList from "./components/AddDelveryBoy/DeliveryBoyList";
import UpdateOrder from './components/Booking/UpdateOrder';
import MyBookings from './components/Booking/Mybooking';
import MybookingForm from './components/Booking/MybookingForm';
import VanDeliveryBoy from "./components/VanDelivery/VanDeliveryBoy";
import DeliveryBoyHistory from './components/VanDelivery/DeliveryBoyHistory';
import OrderDetails from "./components/VanDelivery/OrderDetails";
import AdminSlotBooking from './components/DeliverySlotBooking/AdminSlotBooking';
import BookingSlotPage from './components/DeliverySlotBooking/BookingSlotPage';
import UserSlotPage from "./components/DeliverySlotBooking/UserSlotPage";
import CategoryPage from "./components/Category/CategoryPage";
import AllCategoryItems from "./components/Category/AllCategoryItems";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/reports/customer-orders" element={<CustomerOrders />} />
        <Route path="/booking" element={<Booking/>} />
        <Route path="/item-order-page" element={<ItemOrderPage/>} />
        <Route path="/product-card" element={<ProductCard/>} />
        <Route path="/add-delivery-boy" element={<AddDeliveryBoy/>} />
        <Route path="/delivery-boy-list" element={<DeliveryBoyList/>} />
        <Route path="/update-order" element={<UpdateOrder/>} />
        <Route path="/my-bookings" element={<MyBookings/>} />
        <Route path="/my-booking-form" element={<MybookingForm/>} />
        <Route path="/van-delivery-boy" element={<VanDeliveryBoy/>} />
        <Route path="/delivery-boys-history" element={<DeliveryBoyHistory/>} />
        <Route path="/order-details" element={<OrderDetails/>} />
        <Route path="/delivery-slot-booking" element={<AdminSlotBooking/>} />
        <Route path="/booking-slot-page" element={<BookingSlotPage/>} />
        <Route path="/user-slot-page" element={<UserSlotPage/>} />
        <Route path="/category-page" element={<CategoryPage/>} />
        <Route path="/all-category-items" element={<AllCategoryItems/>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
