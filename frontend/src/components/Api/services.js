import axios from "./Api";

export const registerUser = async (
  username,
  email,
  password,
  age,
  gender,
  address
) => {
  const body = {
    email: email,
    username: username,
    password: password,
    gender: gender,
    age: age,
    address: address,
  };
  const resposne = axios.post("/api/auth/register/customer/", body);
  return resposne;
};

export const registerRestaurant = async (
  email,
  restaurantName,
  password,
  operatingArea,
  operatingFees,
  cuisineType
) => {
  const body = {
    email: email,
    restaurantName: restaurantName,
    password: password,
    operatingArea: operatingArea,
    operatingFees: operatingFees,
    cuisineType: cuisineType,
  };
  const resposne = axios.post("/api/auth/register/restaurant/", body);
  return resposne;
};
