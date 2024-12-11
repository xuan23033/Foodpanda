import React, { useState, useRef } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Nav,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { registerUser } from "../Api/services";

const Register = () => {
  const [ShowNotification, setShowNotification] = useState(false);
  const [ShowNotificationMsg, setShowNotificationMsg] = useState("");

  const toggleNotification = (msg) => {
    setShowNotification(true);
    setShowNotificationMsg(msg);
    setTimeout(() => {
      setShowNotification(false);
      setShowNotificationMsg("");
    }, 2000);
  };

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [gender, setgender] = useState("Male");
  const [age, setage] = useState("");
  const [address, setaddress] = useState("");

  const formRef = useRef();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(
        username,
        email,
        password,
        age,
        gender,
        address
      );
      if (response) {
        console.log(response);
        formRef.current.reset();
        window.location.href = "/login";
      }
    } catch (ex) {
      toggleNotification(ex.response.data.error);
    }
  };
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <Row>
        <Col md="6" className="mt-2">
          <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
            <div className="register-card">
              <h4 style={{ textAlign: "center", marginTop: "10px" }}>
                Welcome!
              </h4>
              <p style={{ textAlign: "center" }}>Register your account</p>
              <ToastContainer position="top-end" style={{ marginTop: "70px" }}>
                <Toast
                  show={ShowNotification}
                  onClose={toggleNotification}
                  bg="danger"
                  className="text-light"
                >
                  <Toast.Header>
                    <strong className="me-auto">Notifcation</strong>
                  </Toast.Header>
                  <Toast.Body>{ShowNotificationMsg}</Toast.Body>
                </Toast>
              </ToastContainer>
              <Form
                ref={formRef}
                style={{ textAlign: "left", marginTop: "10px" }}
                onSubmit={(event) => handleRegistration(event)}
              >
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="register-username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="valid">
                        Looks Good!
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Username is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="register-emailAddress"
                    >
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="valid">
                        Looks Good!
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Email Address is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="register-password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        autoComplete="true"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="valid">
                        Looks Good!
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Password is required
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        We'll never share this with anyone else.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="register-gender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        value={gender}
                        onChange={(e) => setgender(e.target.value)}
                        required
                      >
                        <option disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="register-age">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder=""
                        onChange={(e) => setage(e.target.value)}
                        value={age}
                        required
                      />
                      <Form.Control.Feedback type="valid">
                        Looks Good!
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Age is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="register-address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="10th Street, P.E.C.H.S Block 6"
                        onChange={(e) => setaddress(e.target.value)}
                        value={address}
                        required
                      />
                      <Form.Control.Feedback type="valid">
                        Looks Good!
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Address is required
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        You change change this later.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Button
                    variant="primary"
                    className="form-button w-100"
                    type="submit"
                  >
                    Register
                  </Button>
                </Row>
              </Form>
            </div>
          </div>
        </Col>
        <Col md="6" className="mt-2">
          <img
            src="https://www.elluminatiinc.com/wp-content/uploads/2020/05/foodpan/foodpandacloneapp.png"
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
            Do you want to have an bussiness account?{" "}
            <LinkContainer to="/resturant/signup">
              <Nav.Link>
                <span style={{ color: "#D70F64" }}>Click Here To Register</span>
              </Nav.Link>
            </LinkContainer>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
