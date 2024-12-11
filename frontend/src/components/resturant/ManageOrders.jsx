import React, { useContext } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { ResturantContext } from "../Contexts/ResturantContext";

const ManageOrders = () => {
  const { Orders, removeOrder } = useContext(ResturantContext);
  console.log(Orders);

  const handleRemove = (id) => {
    removeOrder(id);
  };

  return (
    <Container className="mt-5">
      <h3>Customer Orders</h3>
      <p>
        Following are the orders that foodpanda customers have placed for your
        restaurant
      </p>
      <Row>
        <Col>
          {Orders.length > 0 ? (
            <>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th style={{ textAlign: "left" }}>Items</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Orders.map((Order) => {
                    return (
                      <tr key={Order._id}>
                        <td>{Order.username}</td>
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
                                  <strong>Total Price:</strong>
                                  {item.totalPrice}
                                </li>
                              </ul>
                            );
                          })}
                        </td>
                        <td>Rs. {Order.totalAmount}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => {
                              handleRemove(Order._id);
                            }}
                          >
                            Remove Order
                          </Button>
                        </td>
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

export default ManageOrders;
