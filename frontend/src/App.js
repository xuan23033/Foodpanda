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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { AuthContext } from "./components/Contexts/AuthContext";
import { Navigate } from "react-router";
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
      if (userType === "customer") {
      } else if (userType === "restaurant") {
        <Navigate to="/resturant/manage"></Navigate>;
      } else if (userType === "customer") {
        <Navigate to="/customer/manage"></Navigate>;
      }
    }
  }, [setCurrentUser, setuserType, currentUser, userType]);

  return (
    <Router>
      <div className="App">
        <Navigation currentUser={currentUser} userType={userType}></Navigation>
        <Container className="d-flex justify-content-center align-items-center"></Container>
        <Routes>
          <Route exact path="/" element={<Homepage></Homepage>}></Route>
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
         
          <Route
            exact
            path="/resturant/signup"
            element={<RestRegister> </RestRegister>}
          ></Route>
          <Route
            exact
            path="/resturant/login"
            element={<RestLogin> </RestLogin>}
          ></Route>
          <Route
            path="/resturant/manage"
            element={
              <PrivateRoute redirect="/resturant/login" type="restaurant">
                <ManageHome></ManageHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/resturant/manage/orders"
            element={
              <PrivateRoute redirect="/resturant/login" type="restaurant">
                <ManageOrders></ManageOrders>
              </PrivateRoute>
            }
          />
          <Route
            path="/resturant/manage/menu"
            element={
              <PrivateRoute redirect="/resturant/login" type="restaurant">
                <ManageMenu></ManageMenu>
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/manage"
            element={
              <PrivateRoute redirect="/login" type="customer">
                <CustomerHome></CustomerHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/manage/order"
            element={
              <PrivateRoute redirect="/login" type="customer">
                <PlaceOrder></PlaceOrder>
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/manage/order/:restaurantName"
            element={
              <RestaurantMenu></RestaurantMenu>
              //<PrivateRoute redirect="/login" type="customer">
              //  <RestaurantMenu></RestaurantMenu>
              //</PrivateRoute>
            }
          />
          <Route
            path="/customer/manage/status"
            element={
              <PrivateRoute redirect="/login" type="customer">
                <ViewOrders></ViewOrders>
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/manage/cart"
            element={
              <PrivateRoute redirect="/login" type="customer">
                <ViewCart></ViewCart>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
