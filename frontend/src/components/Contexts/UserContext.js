import React, { useState, createContext, useEffect } from "react";
import axios from "../Api/Api";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [Items, setItems] = useState([]);
  const [Orders, setOrders] = useState([]);
  const addItem = (Item) => {
    let temp = Items;
    temp.push(Item);
    setItems(temp);
    console.log(Items);
    window.localStorage.setItem("Items", JSON.stringify(Items));
  };
  const getOrders = () => {
    axios
      .get(`api/orders/customer/${window.localStorage.getItem("username")}`)
      .then(function (response) {
        console.log(response);
        setOrders(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setOrders([]);
      });
  };
  const placeOrder = () => {
    let items = JSON.parse(window.localStorage.getItem("Items"));
    let total = 0;
    items.forEach((item) => {
      total += parseInt(item.totalPrice);
    });
    axios
      .post("/api/orders/", {
        username: window.localStorage.getItem("username"),
        restaurantName: window.localStorage.getItem("restaurantName"),
        items: items,
        totalAmount: total,
      })
      .then(function (response) {
        console.log(response);
        window.localStorage.removeItem("Items");
        window.location.href = "/customer/manage";
        getOrders();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <UserContext.Provider value={{ addItem, placeOrder, Orders }}>
      {props.children}
    </UserContext.Provider>
  );
};
