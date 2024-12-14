import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTypes, setFilterTypes] = useState([]);

  // 當組件加載時，請求餐廳數據
  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error("Failed to fetch restaurants:", error));
  }, []);

  // 處理類型選擇的變化
  const handleFilterChange = (type) => {
    setFilterTypes((prevTypes) => {
      if (prevTypes.includes(type)) {
        return prevTypes.filter((t) => t !== type);
      } else {
        return [...prevTypes, type];
      }
    });
  };

  // 根據搜尋查詢和篩選類型過濾餐廳
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      restaurant.city?.toLowerCase().includes(query) ||
      restaurant.district?.toLowerCase().includes(query) || // 使用 district 來篩選
      restaurant.full_address?.toLowerCase().includes(query) || // 或者 full_address
      restaurant.name?.toLowerCase().includes(query);
    const matchesType =
      filterTypes.length === 0 || filterTypes.includes(restaurant.type);
    return matchesSearch && matchesType;
  });

  return (
    <Container className="my-4">
      <h3>推薦餐廳</h3>

      {/* 搜尋欄位 */}
      <InputGroup className="mb-4">
        <Form.Control
          type="text"
          placeholder="輸入城市或道路名稱搜尋餐廳..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={() => setSearchQuery("")}>清除</Button>
      </InputGroup>

      {/* 篩選類型 */}
      <Form.Group className="mb-4">
  <Form.Label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>菜式</Form.Label>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(9, 1fr)", // 9等分，確保每個選項寬度相等
      gap: "10px", // 控制格子間距
      padding: "10px"
    }}
  >
    {["小吃", "台式", "素食", "港式", "便利商店", "早餐", "咖啡", "義式", "日式"].map((type) => (
      <Form.Check
        key={type}
        type="checkbox"
        id={`filter-${type}`}
        label={<span style={{ fontSize: "1rem" }}>{type}</span>}
        checked={filterTypes.includes(type)}
        onChange={() => handleFilterChange(type)}
        style={{
          margin: "0",               // 移除外邊距
          display: "flex",           // 使用 Flex 排版
          alignItems: "center"       // 垂直置中對齊
        }}
      />
    ))}
  </div>
</Form.Group>




      {/* 餐廳列表 */}
      {filteredRestaurants.length === 0 ? (
        <p>找不到符合條件的餐廳，請嘗試其他關鍵字或篩選條件。</p>
      ) : (
        <Row>
          {filteredRestaurants.map((restaurant) => (
            <Col key={restaurant.restaurant_id} xs={12} md={4} className="mb-4">
              <div className="restaurant-card">
                <img
                  src={restaurant.picture || "https://via.placeholder.com/150"}
                  alt={restaurant.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <h5>{restaurant.name}</h5>
                <p>{restaurant.description}</p>
                <p><strong>類型：</strong>{restaurant.type}</p>
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