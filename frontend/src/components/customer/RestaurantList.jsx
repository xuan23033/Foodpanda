import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const RestaurantList = () => {
  // 本地状态用来存储从 API 获取的餐厅数据
  const [fetchedRestaurants, setFetchedRestaurants] = useState([]);

  // 当组件加载时请求餐厅数据
  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants")
      .then((response) => response.json())
      .then((data) => setFetchedRestaurants(data))  // 更新状态
      .catch((error) => console.error("Failed to fetch restaurants:", error));
  }, []);

  return (
    <div>
      <Container className="my-4">
        <h3>推荐餐厅</h3>
        {/* 如果没有餐厅数据，显示加载提示 */}
        {fetchedRestaurants.length === 0 ? (
          <p>正在加载餐厅数据...</p>
        ) : (
          <Row>
            {fetchedRestaurants.map((restaurant) => (
              <Col key={restaurant.id} xs={12} md={4} className="mb-4">
                <Card className="restaurant-card">
                  <Card.Img
                    variant="top"
                    src={restaurant.image || "https://via.placeholder.com/150"}
                    alt={restaurant.name}
                    style={{ width: "100%", height: "150px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{restaurant.name}</Card.Title>
                    <Card.Text>{restaurant.description}</Card.Text>
                    <Link to={`/customer/manage/order/${restaurant.name}`}>
                      <Button variant="primary">查看菜单</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default RestaurantList;
