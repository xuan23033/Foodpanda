import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const RegisterModal = ({ show, handleClose, handleSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log("開始提交表單...");
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });
      
      console.log("伺服器回應：", response);
      const data = await response.json();

      if (response.ok) {
        alert("註冊成功！");
        handleClose();
      } else {
        setError(data.error || "註冊失敗，請檢查資料");
      }
    } catch (err) {
      setError("伺服器連接失敗，請稍後再試");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>註冊</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleRegisterSubmit}>
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
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>姓名</Form.Label>
            <Form.Control
              type="text"
              placeholder="輸入姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            完成註冊
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <Button variant="link" onClick={handleSwitchToLogin}>
            已有帳號? 登入
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
