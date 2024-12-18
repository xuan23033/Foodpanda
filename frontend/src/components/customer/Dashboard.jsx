import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // 清除 token 和其他使用者資訊
    navigate("/login"); // 跳轉到登入頁面
  };

  return (
    <Container className="mt-5">
      <h3>歡迎來到餐廳訂餐系統！</h3>
      <p>選擇以下功能進行操作：</p>
      <Row>
        <Col md={4}>
          <Link to="/restaurants">
            <Button variant="primary" className="w-100">推薦餐廳列表</Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/cart">
            <Button variant="secondary" className="w-100">查看購物車</Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/profile">
            <Button variant="info" className="w-100">個人檔案</Button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={4}>
          <Link to="/orders">
            <Button variant="success" className="w-100">歷史訂單</Button>
          </Link>
        </Col>
        <Col md={4}>
          <Button variant="danger" className="w-100" onClick={handleLogout}>登出</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
