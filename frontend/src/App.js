import "./App.css";
import Homepage from "./components/home/Homepage";
import RestaurantList from "./components/customer/RestaurantList";
import Login from "./components/customer/Login";
import Register from "./components/customer/Register";
import Navigation from "./components/navigation/Navigation";
import RestRegister from "./components/resturant/RestRegister";
import RestLogin from "./components/resturant/RestLogin";
import ManageHome from "./components/resturant/ManageHome";
import CustomerHome from "./components/customer/CustomerHome";
import ManageOrders from "./components/resturant/ManageOrders";
import ManageMenu from "./components/resturant/ManageMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { AuthContext } from "./components/Contexts/AuthContext";
import { useContext, useEffect } from "react";
import ViewOrders from "./components/customer/ViewOrders";
import PlaceOrder from "./components/customer/PlaceOrder";
import RestaurantMenu from "./components/customer/RestaurantMenu";
import ViewCart from "./components/customer/ViewCart";

function App() {
  const { currentUser, userType, setCurrentUser, setuserType } =
    useContext(AuthContext);

  useEffect(() => {
    if (
      localStorage.getItem("currentUser") &&
      localStorage.getItem("userType")
    ) {
      setCurrentUser(localStorage.getItem("currentUser"));
      setuserType(localStorage.getItem("userType"));
    }
  }, [setCurrentUser, setuserType]);

  // 重定向到用户的主页
  useEffect(() => {
    if (userType === "restaurant") {
      window.location.href = "/resturant/manage";
    } else if (userType === "customer") {
      window.location.href = "/customer/manage";
    }
  }, [userType]);

  return (
    <Router>
      <div className="App">
        <Navigation currentUser={currentUser} userType={userType}></Navigation>
        <Container className="d-flex justify-content-center align-items-center"></Container>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/resturant/signup"
            element={<RestRegister />}
          />
          <Route
            path="/resturant/login"
            element={<RestLogin />}
          />
          <Route
            path="/resturant/manage"
            element={
              <PrivateRoute redirect="/resturant/login" type="restaurant">
                <ManageHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/resturant/manage/orders"
            element={
              <PrivateRoute redirect="/resturant/login" type="restaurant">
                <ManageOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/resturant/manage/menu"
            element={
              <PrivateRoute redirect="/resturant/login" type="restaurant">
                <ManageMenu />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/manage"
            element={
              <PrivateRoute redirect="/login" type="customer">
                <CustomerHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/manage/order"
            element={
              <PrivateRoute redirect="/login" type="customer">
                <PlaceOrder />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/manage/order/:restaurantName"
            element={<RestaurantMenu />}
          />
          <Route
            path="/customer/manage/status"
            element={
              <PrivateRoute redirect="/login" type="customer">
                <ViewOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/manage/cart"
            element={
              <PrivateRoute redirect="/login" type="customer">
                <ViewCart />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
