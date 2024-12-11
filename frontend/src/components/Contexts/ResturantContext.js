import React, { useEffect, useState, createContext } from "react";
import axios from "../Api/Api";

export const ResturantContext = createContext();

export const ResturantProvider = (props) => {
  const [Resturants, setResturants] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [Items, setItems] = useState([]);
  const fetchResturants = async () => {
    axios
      .get("/api/restaurant")
      .then(function (response) {
        const resturants = response.data.data;
        setResturants(resturants);
        console.log(resturants);
      })
      .catch(function (error) {
        console.log(error);
        setResturants([]);
      });
  };
  const fetchOrders = () => {
    axios
      .get(
        `api/orders/restaurant/${window.localStorage.getItem("restaurantName")}`
      )
      .then(function (response) {
        setOrders(response.data.data);
        console.log(Orders);
      })
      .catch((error) => {
        console.log(error);
        setOrders([]);
      });
  };
  const fetchItems = async () => {
    axios
      .get(`/api/menu/items/${window.localStorage.getItem("restaurantName")}`)
      .then(function (response) {
        const items = response.data.data;
        setItems(items);
        console.log(items);
      })
      .catch(function (error) {
        console.log(error);
        setItems([]);
      });
  };

  const addCategory = async (categoryName) => {
    axios
      .post(
        `/api/menu/category/${window.localStorage.getItem(
          "restaurantName"
        )}/${categoryName}`
      )
      .then(function (response) {
        console.log(response);
      });
  };
  const updateCategory = async (categoryName) => {
    // axios
    //   .put(`/api/menu/category/PizzaHut/${categoryName}`)
    //   .then(function (response) {
    //     console.log(response);
    //     fetchItems();
    //   });
  };
  const deleteCategory = async (categoryName) => {
    axios
      .delete(
        `/api/menu/category/${window.localStorage.getItem(
          "restaurantName"
        )}/${categoryName}`
      )
      .then(function (response) {
        console.log(response);
        fetchItems();
      });
  };
  const addItem = async (
    categoryName,
    itemName,
    itemDescription,
    itemPrice
  ) => {
    axios
      .post("/api/menu/items", {
        restaurantName: window.localStorage
          .getItem("restaurantName")
          .toString(),
        categoryName: categoryName,
        itemName: itemName,
        itemPrice: itemPrice,
        itemDescription: itemDescription,
      })
      .then(() => {
        //Reason to use Fetch is to use we want to get updated values from all categories
        fetchItems();
      });
  };
  const updateItem = async (
    id,
    categoryName,
    itemName,
    itemDescription,
    itemPrice
  ) => {
    axios
      .put("/api/menu/items", {
        _id: id,
        restaurantName: window.localStorage
          .getItem("restaurantName")
          .toString(),
        categoryName: categoryName,
        itemName: itemName,
        itemPrice: itemPrice,
        itemDescription: itemDescription,
      })
      .then(() => {
        //Reason to use Fetch is to use we want to get updated values from all categories
        fetchItems();
      });
  };

  const deleteItem = async (categoryName, itemName) => {
    console.log(categoryName, itemName);
    axios
      .delete("/api/menu/items", {
        data: {
          restaurantName: window.localStorage
            .getItem("restaurantName")
            .toString(),
          categoryName: categoryName,
          itemName: itemName,
        },
      })
      .then(() => {
        //Reason to use Fetch is to use we want to get updated values from all categories
        fetchItems();
      });
  };
  const removeOrder = async (id) => {
    axios
      .delete("/api/orders/", {
        data: {
          _id: id,
        },
      })
      .then(() => {
        //Reason to use Fetch is to use we want to get updated values from all categories
        fetchOrders();
      });
  };

  useEffect(() => {
    fetchOrders();
    fetchResturants();
    fetchItems();
  }, []);

  return (
    <ResturantContext.Provider
      value={{
        Resturants,
        setResturants,
        Items,
        setItems,
        updateItem,
        addCategory,
        deleteCategory,
        updateCategory,
        addItem,
        deleteItem,
        fetchItems,
        Orders,
        removeOrder,
      }}
    >
      {props.children}
    </ResturantContext.Provider>
  );
};
