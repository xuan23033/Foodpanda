import React, { useEffect, useState, createContext } from "react";
import axios from "../Api/Api";

export const ResturantContext = createContext();

export const ResturantProvider = ({ children }) => {
  const [currentRestaurant, setCurrentRestaurant] = useState(
    window.localStorage.getItem("restaurantName") || null
  );
  const [Resturants, setResturants] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [Items, setItems] = useState([]);

  const handleError = (error) => {
    console.error("API Error:", error.response?.data || error.message);
  };

  const fetchResturants = async () => {
    try {
      const response = await axios.get("/api/restaurant");
      setResturants(response.data.data);
    } catch (error) {
      handleError(error);
      setResturants([]);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/api/orders/restaurant/${currentRestaurant}`);
      setOrders(response.data.data);
    } catch (error) {
      handleError(error);
      setOrders([]);
    }
  };

  const fetchItems = async () => {
    const restaurantName = window.localStorage.getItem("restaurantName");
    
    if (restaurantName) {
      try {
        const response = await axios.get(`/api/menu/items/${encodeURIComponent(restaurantName)}`);
        const menuItems = response.data;
        // 更新 Items 状态
        setItems(menuItems);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    } else {
      console.error("No restaurant selected.");
    }
  };

  const addItem = async (categoryName, itemName, itemDescription, itemPrice) => {
    try {
      const response = await axios.post("/api/menu/items", {
        restaurantName: currentRestaurant,
        categoryName,
        itemName,
        itemPrice,
        itemDescription,
      });
      setItems((prevItems) => [...prevItems, response.data.newItem]);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        await Promise.all([fetchResturants(), fetchOrders(), fetchItems()]);
      } catch (error) {
        handleError(error);
      }
    };

    initializeData();
  }, [currentRestaurant]);

  return (
    <ResturantContext.Provider
      value={{
        currentRestaurant,
        setCurrentRestaurant,
        Resturants,
        setResturants,
        Items,
        setItems,
        Orders,
        fetchResturants,
        fetchOrders,
        fetchItems,
        addItem,
      }}
    >
      {children}
    </ResturantContext.Provider>
  );
};
