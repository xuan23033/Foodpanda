import React, { useContext } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { UserContext } from "../Contexts/UserContext";
const ViewCart = () => {
  const { placeOrder } = useContext(UserContext);
  const Items = JSON.parse(window.localStorage.getItem("Items"));

  return (
    <Container className="mt-5">
      <h3>Your Cart</h3>
      <p>Following are the items you have added to the cart</p>
      <Row>
        <Col>
          {Items ? (
            <>
              <Table>
                <thead>
                  <tr>
                    <th>Items</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {Items.map((Item, i) => {
                    return (
                      <tr key={i}>
                        <td>{Item.itemName}</td>
                        <td>{Item.itemQuantity}</td>
                        <td>Rs. {Item.itemPrice}</td>
                        <td>Rs. {Item.totalPrice}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Button className="form-button" onClick={placeOrder}>
                Confirm and Place Order
              </Button>
            </>
          ) : (
            <img
              src="https://www.no-fea.com/front/images/empty-cart.png"
              alt="empty-cart"
              width={"300px"}
            ></img>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewCart;
