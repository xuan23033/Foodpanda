import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { UserContext } from "../Contexts/UserContext";

const ViewOrders = () => {
  const { cartItems, setOrders, Orders } = useContext(UserContext);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  // 計算總金額
  useEffect(() => {
    if (cartItems) {
      const amount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
      setTotalAmount(amount);
    }
  }, [cartItems]);

  // 下訂單邏輯
  const handlePlaceOrder = () => {
    if (cartItems) {
      const newOrder = {
        _id: new Date().getTime(),
        restaurantName: "Your Selected Restaurant",
        items: cartItems,
        totalAmount: totalAmount,
        paymentMethod:
          paymentMethod === "Credit Card"
            ? `Credit Card (${creditCardNumber})`
            : paymentMethod,
      };
      setOrders([...Orders, newOrder]);
      setIsOrderPlaced(true);
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

          {/* 付款方式置中 */}
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

              {/* 下訂單按鈕 */}
              <Button
                onClick={handlePlaceOrder}
                className="mt-3"
                disabled={
                  paymentMethod === "Credit Card" &&
                  (!creditCardNumber || !expiryDate || !cvv)
                }
              >
                Confirm Order
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <img
          src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png"
          alt="empty-order"
          width={"300px"}
        />
      )}
    </Container>
  );
};

export default ViewOrders;
