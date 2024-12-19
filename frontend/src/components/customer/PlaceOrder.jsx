import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import { UserContext } from "../Contexts/UserContext";

const PlaceOrder = () => {
  const location = useLocation();
  const { order } = location.state || {};  // 取得從 ViewOrders 傳來的訂單

  const [orderStatus, setOrderStatus] = useState("訂單確認中");
  const [estimatedTime, setEstimatedTime] = useState("20 分鐘");
  const [currentLocation, setCurrentLocation] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [orderDelivered, setOrderDelivered] = useState(false); 

  // 模擬訂單狀態更新
  useEffect(() => {
    const statusUpdates = [
      { status: "訂單確認中", notification: "您的訂單已確認。" },
      { status: "外送員已接單", notification: "外送員已接單，準備出發。" },
      { status: "外送中", notification: "訂單正在配送中。" },
      { status: "已送達", notification: "訂單已送達，請確認收貨！" },
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < statusUpdates.length && !orderDelivered) {
        setOrderStatus(statusUpdates[index].status);
        setNotifications((prev) => [...prev, statusUpdates[index].notification]);
        index++;
      } else if (orderDelivered) {
        setOrderStatus("已送達");
        setNotifications((prev) => [...prev, "您的訂單已送達，請確認收貨！"]);
        clearInterval(interval);
      } else {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [orderDelivered]);

  // 在組件掛載時檢查訂單數據
  useEffect(() => {
    console.log("接收到的訂單數據:", order);
  }, [order]);

  // 顯示地址信息
  const { address } = order || {};
  const fullAddress = address ? `${address.city} ${address.district} ${address.street} ${address.alley} ${address.houseNumber} ${address.floor}` : "無地址信息";

  // 確保當訂單已送達時不會跳空白頁面
  if (!order) {
    return <div>訂單資料未找到。</div>;
  }

  return (
    <Container className="mt-5">
      <h3>訂單管理與追蹤</h3>
      <p>追蹤您的訂單狀態與即時位置</p>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>目前訂單狀態</Card.Title>
              <Card.Text>
                <strong>{orderStatus}</strong>
              </Card.Text>
              <ProgressBar
                now={
                  orderStatus === "訂單確認中"
                    ? 25
                    : orderStatus === "外送員已接單"
                    ? 50
                    : orderStatus === "外送中"
                    ? 75
                    : 100
                }
                label={orderStatus}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>預估送達時間</Card.Title>
              <Card.Text>
                <strong>{estimatedTime}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>即時訂單位置</Card.Title>
              <Card.Text>{currentLocation}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 顯示地址信息 */}
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>送餐地址</Card.Title>
              <Card.Text>{fullAddress}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 顯示通知內容 */}
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>通知</Card.Title>
              <Card.Text>
                {notifications.map((notification, index) => (
                  <div key={index}>{notification}</div>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrder;
