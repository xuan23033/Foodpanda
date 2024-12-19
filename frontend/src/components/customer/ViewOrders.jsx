import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom"; // 引入 useNavigate

const ViewOrders = () => {
  const { cartItems, setOrders, Orders, HistoryOrders, setHistoryOrders } = useContext(UserContext);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [alley, setAlley] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [floor, setFloor] = useState("");

  const navigate = useNavigate(); // 初始化 useNavigate

  const [notification, setNotification] = useState(null);

  const toggleNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); // 5秒後清除通知
  };

  // 計算總金額
  useEffect(() => {
    if (cartItems) {
      const amount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
      setTotalAmount(amount);
    }
  }, [cartItems]);

  // 下訂單邏輯並跳轉頁面
  const handlePlaceOrder = () => {
    try {
      if (!cartItems || cartItems.length === 0) {
        // 顯示警告通知，提醒用戶購物車為空
        toggleNotification("Warning, Your cart is empty!", "danger");
        return;
      }

      if (!paymentMethod) {
        // 顯示警告通知，提醒用戶未選擇付款方式
        toggleNotification("Warning, Please select a payment method!", "danger");
        return;
      }

      // 確認訂單資料並設置訂單
      const newOrder = {
        _id: new Date().getTime(),
        restaurantName: "Your Selected Restaurant",
        items: cartItems,
        totalAmount: totalAmount,
        paymentMethod: paymentMethod === "Credit Card" ? `Credit Card (${creditCardNumber})` : paymentMethod,
        address: {
          city,
          district,
          street,
          alley,
          houseNumber,
          floor
        },
      };

      // 設置訂單為已下單並跳轉
      setIsOrderPlaced(true);
      setOrders((prevOrders) => [...prevOrders, newOrder]); // 假設你有 `setOrders` 方法來保存訂單
      navigate("/customer/manage/order", { state: { order: newOrder } }); // 跳轉至 PlaceOrder 頁面

      // 將訂單新增到歷史訂單
      setHistoryOrders((prevHistory) => [...prevHistory, newOrder]);

      // 顯示成功通知
      toggleNotification("Woohoo, Your order has been placed!", "success");
    } catch (error) {
      console.error("跳轉錯誤:", error);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h3 className="text-center">Your Orders</h3>
      <p className="text-center">Following are the items you have added to the cart</p>
      {cartItems && cartItems.length > 0 ? (
        <>
          <Table responsive>
            <thead>
              <tr>
                <th>Items</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <tr key={i}>
                  <td>{item.itemName}</td>
                  <td>{item.itemQuantity}</td>
                  <td>Rs. {item.itemPrice}</td>
                  <td>Rs. {item.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Row className="mt-4 text-center">
            <Col>
              <h4>Total Amount: Rs. {totalAmount}</h4>
            </Col>
          </Row>

          {/* 付款方式與地址輸入框 */}
          <Row className="mt-4 justify-content-center">
            <Col md={8} className="text-center">
              <h5>Select Payment Method</h5>
              <Form.Group className="mb-4">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "30px",
                  }}
                >
                  {["Cash on Delivery", "Credit Card"].map((method) => (
                    <Form.Check
                      key={method}
                      type="radio"
                      id={`payment-${method}`}
                      name="paymentMethod"
                      label={<span style={{ fontSize: "1.1rem" }}>{method}</span>}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                      style={{ margin: "0" }}
                    />
                  ))}
                </div>
              </Form.Group>

              {/* 信用卡資訊輸入框 */}
              {paymentMethod === "Credit Card" && (
                <div className="credit-card-form p-3">
                  <Form.Group className="mb-3">
                    <Form.Label>信用卡號碼</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={creditCardNumber}
                      onChange={(e) => setCreditCardNumber(e.target.value)}
                      maxLength="19"
                    />
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>到期日 (MM/YY)</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          maxLength="5"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>安全驗證碼</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="CVV"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          maxLength="3"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              )}

              {/* 地址輸入框 */}
              <h5 className="mt-4">輸入送餐地址</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>縣市</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="如：台北市"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>區</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="如：大安區"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>街道</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="如：仁愛路"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>巷弄</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="如：巷弄1號"
                      value={alley}
                      onChange={(e) => setAlley(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>門牌號碼</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="如：10號"
                      value={houseNumber}
                      onChange={(e) => setHouseNumber(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>樓層</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="如：3樓"
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* 確認訂單按鈕 */}
              <Button onClick={handlePlaceOrder} className="mt-4" variant="primary" size="lg">
                確認訂單
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <h4>No items in your cart</h4>
      )}

      {/* 顯示通知 */}
      {notification && (
        <div className={`alert alert-${notification.type} mt-4`} role="alert">
          {notification.message}
        </div>
      )}
    </Container>
  );
};

export default ViewOrders;
