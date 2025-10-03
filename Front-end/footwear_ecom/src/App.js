import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import LoginForm from './components/LoginForm'; 
import SignupForm from './components/SignupForm';
import Home from './components/home/Home';
import ProductList from './components/pages/productlist';
import ProductDetail from './components/pages/ProductDetail';
import Cart from './components/Cart/Cart';
import UserProfile from './components/User/UserProfile';
import OrderHistory from './components/User/OrderHistory';
import Checkout from './components/Cart/CheckOut';
import ChangePassword from './components/User/ChangePassword';


import SearchResults from './components/home/SearchResults';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  );
}

export default App;
