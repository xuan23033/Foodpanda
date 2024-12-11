import React from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ManageHome = () => {
  const options = [
    {
      id: 1,
      image:
        "https://www.plourin-morlaix.bzh/var/intranet/storage/images/media/images/plourin/menu2/432537-1-fre-FR/menu.png",
      name: "Manage Menu",
      description:
        "Here you can manage the menu of your restaurant by adding categories and items",
      redirect: "/resturant/manage/menu",
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLWxTaTU_iDPpEoyh3MGSNaAc9vm4h8EBC2wNwRdoZbM0zOEA_datzSgsrMDQLxwI_vew&usqp=CAU",
      name: "Manage Orders",
      description:
        "Here you can manage the orders of your restaurant by updating their status",
      redirect: "/resturant/manage/orders",
    },
  ];
  return (
    <Container className=" mt-5 d-flex flex-column justify-content-center align-items-center">
      <h3>Manage your restaurant</h3>
      <p>
        Using the options below, you can customize your restaurant on foodpanda
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

export default ManageHome;
