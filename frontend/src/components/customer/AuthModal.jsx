import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AuthModal = ({ show, handleClose, isLogin, toggleAuthMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("登入:", email, password);
      // 呼叫登入 API
    } else {
      console.log("註冊:", email, password);
      // 呼叫註冊 API
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? "登入" : "註冊"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
            {isLogin ? "登入" : "註冊"}
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <Button variant="link" onClick={toggleAuthMode}>
            {isLogin ? "還沒有帳號? 註冊" : "已有帳號? 登入"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
