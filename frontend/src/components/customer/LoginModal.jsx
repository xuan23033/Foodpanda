import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const LoginModal = ({ show, handleClose, handleSwitchToRegister, redirectTo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();  // 獲取當前路由的資訊

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    console.log("開始提交表單...");
    

    try {
      const response = await fetch(`http://localhost:5000/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("伺服器回應：", response);
      const data = await response.json();

      if (response.ok) {
        // 成功登入
        alert("登入成功！");
        localStorage.setItem("token", data.token);  // 儲存 token
        localStorage.setItem("userType", data.userType);  // 儲存 userType
        handleClose();  // 關閉登入 Modal
        // 執行任何額外的行為，例如刷新頁面或導航到用戶專屬頁面
        window.location.reload();  // 可選：重新載入頁面來更新 UI
      } else {
        setError(data.error || "登入失敗，請檢查帳號和密碼");
      }
    } catch (err) {
      setError("伺服器連接失敗，請稍後再試");
    } finally {
      setIsSubmitting(false);  // 恢復按鈕可用
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
            {isSubmitting ? "登入中..." : "登入"}
          </Button>
          {error && <p>{error}</p>}
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
