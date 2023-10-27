import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navbarjsx from "./Components/Navbar";
import Product from "./Components/Products";
import UserProduct from "./Components/UserProduct";
import CartView from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Footer from "./Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbarjsx />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Menu" element={<Product />} />
          <Route path="/UserProducts" element={<UserProduct />} />
          <Route path="/Cart" element={<CartView />} />
          <Route path="/Checkout" element={<Checkout />} />
      
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
