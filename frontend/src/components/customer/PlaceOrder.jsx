import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ResturantCollection from "../home/ResturantCollection";

const PlaceOrder = () => {
  return (
    <Container className="mt-5">
      <h3>Available Restaurants</h3>
      <p>
        Using the restaurants below, you can check them out and place your
        orders on foodpanda
      </p>
      <Row>
        <Col md={12}>
          <ResturantCollection showMenu={true}></ResturantCollection>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrder;
