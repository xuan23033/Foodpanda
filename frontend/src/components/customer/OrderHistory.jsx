import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders/1"); // 固定 user_id 為 1
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container className="mt-5">
      <h3>歷史訂單</h3>
      {orders.length === 0 ? (
        <p>目前沒有歷史訂單。</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>訂單編號</th>
              <th>餐廳名稱</th>
              <th>總金額</th>
              <th>訂單日期</th>
              <th>餐點內容</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.restaurant_name}</td>
                <td>Rs. {order.total_price}</td>
                <td>{new Date(order.order_date).toLocaleString()}</td>
                <td>{order.items}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default OrderHistory;
