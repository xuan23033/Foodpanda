import React, { useState, createContext, useEffect } from "react";
import axios from "../Api/Api";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [Items, setItems] = useState(() => {
    // 初始化 Items，從 localStorage 中讀取數據
    const storedItems = window.localStorage.getItem("Items");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const [Orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]); // 新增 cartItems 狀態

  // 新增商品至購物車
  const addItem = (Item) => {
    const updatedItems = [...Items, Item];
    setItems(updatedItems);
    window.localStorage.setItem("Items", JSON.stringify(updatedItems));
  };

  // 獲取訂單資料
  const getOrders = () => {
    axios
      .get(`api/orders/customer/${window.localStorage.getItem("username")}`)
      .then((response) => {
        console.log(response);
        setOrders(response.data.data || []);
      })
      .catch((error) => {
        console.log(error);
        setOrders([]); // 若發生錯誤，設定空訂單列表
      });
  };

  // 下單功能
  const placeOrder = () => {
    const items = JSON.parse(window.localStorage.getItem("Items")) || [];
    let total = items.reduce((acc, item) => acc + parseInt(item.totalPrice, 10), 0);

    if (items.length === 0) {
      console.error("購物車為空，無法下單。");
      return;
    }

    axios
      .post("/api/orders/", {
        username: window.localStorage.getItem("username"),
        restaurantName: window.localStorage.getItem("restaurantName"),
        items: items,
        totalAmount: total,
      })
      .then((response) => {
        console.log("Order placed successfully:", response);
        // 清空購物車
        setItems([]);
        window.localStorage.removeItem("Items");
        // 重新載入訂單資料
        getOrders();
        // 導向管理頁面或訂單頁面
        window.location.href = "/customer/manage";
      })
      .catch((error) => {
        console.log("Error placing order:", error);
      });
  };

  useEffect(() => {
    getOrders(); // 初始化時載入訂單資料
  }, []);

  return (
    <UserContext.Provider value={{ Items, Orders, addItem,placeOrder, getOrders, cartItems, setCartItems }}>
      {props.children}
    </UserContext.Provider>
  );
};
