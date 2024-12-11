import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  // 當組件加載時，請求餐廳數據
  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error("Failed to fetch restaurants:", error));
  }, []);

  return (
    <Container className="my-4">
      <h3>推薦餐廳</h3>
      {restaurants.length === 0 ? (
        <p>正在載入餐廳數據...</p>
      ) : (
        <Row>
          {restaurants.map((restaurant) => (
            <Col key={restaurant.id} xs={12} md={4} className="mb-4">
              <div className="restaurant-card">
                <img
                  src={restaurant.image || "https://via.placeholder.com/150"}
                  alt={restaurant.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <h5>{restaurant.name}</h5>
                <p>{restaurant.description}</p>
                <Link to={`/customer/manage/order/${restaurant.name}`}>
                  <Button variant="primary">查看菜單</Button>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default RestaurantList;
