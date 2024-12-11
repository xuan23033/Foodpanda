import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const RestLogin = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { loginResturant, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginResturant(
      Email,
      Password,
      "/api/auth/login/restaurant/",
      "/resturant/manage"
    );
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/resturant/manage");
    }
  }, [currentUser, navigate]);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <Row>
        <Col md="6" className="mt-2">
          <div className="mt-5 d-flex flex-column  justify-content-center align-items-center">
            <div className="login-card">
              <h4 style={{ textAlign: "center", marginTop: "10px" }}>
                Welcome!
              </h4>
              <p style={{ textAlign: "center" }}>
                Login to your business account
              </p>
              <Form
                style={{ textAlign: "left", marginTop: "10px" }}
                onSubmit={handleSubmit}
              >
                <Form.Group className="mb-3" controlId="resturantEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="resturantPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="form-button w-100"
                >
                  Login
                </Button>
              </Form>
            </div>
          </div>
        </Col>
        <Col md="6" className="mt-2">
          <img
            src="https://cdn.shopify.com/s/files/1/0450/3601/1669/files/Icon_step1_250x250_63144373-5b63-4b4d-9443-456976787e3f_1200x1200.png?v=1618642455"
            height={300}
            width={300}
            style={{ marginTop: "60px" }}
            alt="display-logo"
          ></img>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <p className="business-text">
            Do you have an customer account?{" "}
            <LinkContainer to="/login">
              <Nav.Link>
                <span style={{ color: "#D70F64" }}>Click Here To Login</span>
              </Nav.Link>
            </LinkContainer>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default RestLogin;
