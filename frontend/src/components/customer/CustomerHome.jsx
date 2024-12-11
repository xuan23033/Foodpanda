import React from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CustomerHome = () => {
  const options = [
    {
      id: 1,
      image: "https://appcoup.com/assets/img/slide-groceryappdevelopment.png",
      name: "Place Orders",
      description:
        "Here you can place orders from restaurant by adding items from their menus and placing order",
      redirect: "/customer/manage/order",
    },
    {
      id: 2,
      image: "https://www.appdupe.com/img/foodpanda-clone/2.jpg",
      name: "View Orders",
      description:
        "Here you can view your orders status that you have placed via foodpanda",
      redirect: "/customer/manage/status",
    },
  ];
  return (
    <Container className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <h3>Place Orders and View Orders</h3>
      <p>
        Using the options below, you can order and check status of your orders
        on foodpanda
      </p>
      <Row>
        {options.map((option) => {
          return (
            <Col
              md={6}
              key={option.id}
              className="d-flex justify-content-center align-items-center mb-2"
            >
              <Card className="menu-card">
                <Card.Img
                  variant="top"
                  src={option.image}
                  height={"170px"}
                  width={"100px"}
                />
                <Card.Body>
                  <Card.Title>{option.name}</Card.Title>
                  <Card.Text>{option.description}</Card.Text>
                  <LinkContainer
                    to={option.redirect}
                    className="btn-primary form-button"
                  >
                    <Nav.Link>{option.name}</Nav.Link>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default CustomerHome;
