import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const LoginModal = ({ show, handleClose, handleSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("登入成功！");
        handleClose();
      } else {
        setError(data.error || "登入失敗，請檢查帳號或密碼");
      }
    } catch (err) {
      setError("伺服器連接失敗，請稍後再試");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>登入</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLoginSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="輸入 Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>密碼</Form.Label>
            <Form.Control
              type="password"
              placeholder="輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            登入
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <Button variant="link" onClick={handleSwitchToRegister}>
            還沒有帳號？註冊
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
