import React, { useContext, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

const ViewCart = () => {
  const { setCartItems } = useContext(UserContext); // 使用 Context 設定購物車內容
  const navigate = useNavigate(); // 導航功能
  const [Items, setItems] = useState(JSON.parse(window.localStorage.getItem("Items")) || []); // 初始化購物車內容

  const handlePlaceOrder = () => {
    if (Items && Items.length > 0) {
      setCartItems(Items); // 將購物車內容保存到 Context
      navigate("/customer/vieworders"); // 跳轉到 ViewOrders 頁面
    } else {
      alert("Your cart is empty.");
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = Items.filter((_, i) => i !== index); // 根據索引刪除項目
    setItems(updatedItems);
    window.localStorage.setItem("Items", JSON.stringify(updatedItems)); // 更新 localStorage
  };

  return (
    <Container className="mt-5">
      <h3>Your Cart</h3>
      <p>Following are the items you have added to the cart</p>
      <Row>
        <Col>
          {Items.length > 0 ? (
            <>
              <Table>
                <thead>
                  <tr>
                    <th>Items</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Items.map((Item, i) => (
                    <tr key={i}>
                      <td>{Item.itemName}</td>
                      <td>{Item.itemQuantity}</td>
                      <td>Rs. {Item.itemPrice}</td>
                      <td>Rs. {Item.totalPrice}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleDeleteItem(i)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button onClick={handlePlaceOrder} className="btn btn-success">
                Confirm and Place Order
              </Button>
            </>
          ) : (
            <img
              src="https://www.no-fea.com/front/images/empty-cart.png"
              alt="empty-cart"
              width={"300px"}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewCart;
