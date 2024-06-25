import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Header from "./fragments/Header";
import Register from "./pages/Register";
import CategoryProducts from "./pages/CategoryProducts";
import {
  getCart,
  getUser,
  removeUser,
  removeCart,
  getProfile,
} from "./data/repository";
import Cart from "./pages/Cart";
import OrderSummary from "./pages/OrderSummary";
import PaymentConfirm from "./pages/PaymentConfirm";
import UserContext from "./contexts/UserContext";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import useCart from "./hooks/useCart";
import Product from "./pages/Product";
import UserPersonalised from "./pages/UserPersonalised";
import MealPlanner from "./pages/MealPlanner";
import PrivateRoutes from "./utility/PrivateRoutes";

function App() {
  const [username, setUsername] = useState(getUser());
  const [name, setName] = useState();

  const {
    addToCart,
    cartNotificationCount,
    removeFromCart,
    displayCartItem,
    cartSubmit,
    clearCartItems,
    updateCartItemQuantity,
  } = useCart(getCart());

  useEffect(() => {
    const fetchName = async () => {
      const currentUser = getUser();
      if (currentUser) {
        try {
          const response = await getProfile();
          setName(response.firstname + " " + response.lastname);
        } catch (error) {}
      }
    };

    fetchName();
  }, []);

  const loginUser = (username) => {
    setUsername(username);
  };

  const loginName = (name) => {
    setName(name);
  };

  const logoutUser = () => {
    removeUser();
    removeCart();
    setUsername(null);
    clearCartItems();
  };

  return (
    <div>
      <UserContext.Provider
        value={{
          username,
          loginUser,
          logoutUser,
          cartNotificationCount,
          addToCart,
          removeFromCart,
          updateCartItemQuantity,
          displayCartItem,
          cartSubmit,
          loginName,
          name,
        }}
      >
        <div className="d-flex flex-column min-vh-100">
          <Router>
            <Header />
            <Navbar />
            <main role="main">
              <div className="container my-3">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/aboutUs" element={<AboutUs />} />
                  <Route path="/contactUs" element={<ContactUs />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/categoryProducts"
                    element={<CategoryProducts />}
                  />
                  <Route path="/product/:id" element={<Product />} />

                  <Route element={<PrivateRoutes />}>
                    <Route path="/profile" element={<MyProfile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/OrderSummary" element={<OrderSummary />} />
                    <Route
                      path="/PaymentConfirm"
                      element={<PaymentConfirm />}
                    />
                    <Route
                      path="/userpersonalised"
                      element={<UserPersonalised />}
                    />
                    <Route path="/mealplanner" element={<MealPlanner />} />
                  </Route>
                </Routes>
              </div>
            </main>
            <Footer />
          </Router>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
