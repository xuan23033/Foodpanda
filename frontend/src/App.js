import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import Homepage from "./components/home/Homepage";
import RestaurantList from "./components/customer/RestaurantList";
import Navigation from "./components/navigation/Navigation";
import CustomerHome from "./components/customer/CustomerHome";
import ViewOrders from "./components/customer/ViewOrders";
import PlaceOrder from "./components/customer/PlaceOrder";
import RestaurantMenu from "./components/customer/RestaurantMenu";
import ViewCart from "./components/customer/ViewCart";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { AuthContext, AuthProvider } from "./components/Contexts/AuthContext";
import Dashboard from "./components/customer/Dashboard";
import OrderHistory from "./components/customer/OrderHistory";
import Profile from "./components/customer/Profile";


function App() {
  const { currentUser, userType, setCurrentUser, setuserType } = useContext(AuthContext);

  // 恢復用戶登入狀態
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedUserType = localStorage.getItem("userType");
    if (savedUser && savedUserType) {
      setCurrentUser(savedUser);
      setuserType(savedUserType);
    }
  }, [setCurrentUser, setuserType]);

  // 根據用戶類型進行重定向
  useEffect(() => {
    if (userType === "customer") {
      window.location.href = "/customer/manage";
    }
  }, [userType]);

  return (
    <Router>
      <div className="App">
        {/* 導航欄 */}
        <Navigation currentUser={currentUser} userType={userType} />

        {/* 主頁內容 */}
        <Container className="d-flex justify-content-center align-items-center"></Container>

        {/* 路由配置 */}
        <Routes>
          {/* 公開頁面 */}
          <Route path="/" element={<Homepage />} />
          <Route path="/restaurants" element={<RestaurantList />} />

          {/* 客戶專屬頁面 */}
          <Route
            path="/customer/manage"
            element={
              /*<PrivateRoute redirect="/login" type="customer">*/
                <Dashboard />
              /*</PrivateRoute>*/
            }
          />
          <Route
            path="/orders"  
            element={<OrderHistory />}
          />
          <Route
            path="/profile"  
            element={<Profile />}
          />
          <Route
            path="/customer/manage/order"  /* 外送員 */
            element={<PlaceOrder />}
          />
          <Route
            path="/customer/manage/order/:restaurantName"
            element={<RestaurantMenu />}
          />
          <Route
            path="/customer/vieworders"  /* 結帳 */
            element={<ViewOrders />}
          />
          <Route
            path="/customer/manage/cart"
            element={<ViewCart />}
          />

          {/* 未知路由處理 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
