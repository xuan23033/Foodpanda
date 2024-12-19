import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css"; // 引入自定義樣式

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // 清除 token 和其他使用者資訊
    navigate("/login"); // 跳轉到登入頁面
  };

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <Col>
          <h3 className="dashboard-heading">歡迎來到餐廳訂餐系統！</h3>
          <p className="dashboard-subheading">選擇以下功能進行操作：</p>
        </Col>
      </Row>

      {/* 餐廳推薦區塊 */}
      <Row className="mt-4">
        <Col>
          <Card className="restaurant-card shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="text-center">推薦餐廳列表</Card.Title>
              <Link to="/restaurants">
                <Button variant="danger" className="w-100">
                  立即查看餐廳
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 其他功能區塊 */}
      <Row>
        <Col md={4}>
          <Card className="function-card shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="text-center">查看購物車</Card.Title>
              <Link to="/customer/manage/cart">
                <Button variant="primary" className="w-100">查看購物車</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="function-card shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="text-center">個人檔案</Card.Title>
              <Link to="/profile">
                <Button variant="info" className="w-100">個人檔案</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="function-card shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="text-center">歷史訂單</Card.Title>
              <Link to="/orders">
                <Button variant="success" className="w-100">歷史訂單</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 登出按鈕 */}
      <Row className="mt-4">
        <Col md={4} className="offset-md-4">
          <Button variant="danger" className="w-100" onClick={handleLogout}>登出</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
