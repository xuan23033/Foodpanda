import React, { useContext } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { UserContext } from "../Contexts/UserContext";

const ViewOrders = () => {
  const { Orders } = useContext(UserContext);
  console.log(Orders);

  return (
    <Container className="mt-5">
      <h3>Your Orders</h3>
      <p>Following are the orders you have placed to foodpanda</p>
      <Row>
        <Col>
          {Orders.length > 0 ? (
            <>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Restaurant Name</th>
                    <th style={{ textAlign: "left" }}>Items</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Orders.map((Order) => {
                    return (
                      <tr key={Order._id}>
                        <td>{Order.restaurantName}</td>
                        <td>
                          {Order.items.map((item) => {
                            return (
                              <ul style={{ textAlign: "left" }} key={item._id}>
                                <li>
                                  <strong>Item:</strong> {item.itemName}
                                </li>
                                <li>
                                  <strong>Quantity:</strong> {item.itemQuantity}
                                </li>
                                <li>
                                  <strong>Total Price: Rs. </strong>
                                  {item.totalPrice}
                                </li>
                              </ul>
                            );
                          })}
                        </td>
                        <td>Rs. {Order.totalAmount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          ) : (
            <img
              src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png"
              alt="empty-order"
              width={"300px"}
            ></img>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewOrders;
