import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const LoginModal = ({ show, handleClose, handleSwitchToRegister }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); // 管理 email 狀態
  const [password, setPassword] = useState(""); // 管理 password 狀態
  const [error, setError] = useState(""); // 錯誤訊息
  const [isSubmitting, setIsSubmitting] = useState(false); // 控制是否正在提交

  // 處理登入邏輯
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // 設置為正在提交

    try {
      const response = await fetch(`http://localhost:5000/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 成功登入
        alert("登入成功！");
        localStorage.setItem("token", data.token); // 將 token 儲存到 localStorage
        localStorage.setItem("userType", data.userType); // 儲存用戶類型
        login(data.token, data.userType); // 更新 AuthContext
        handleClose(); // 關閉登入 Modal
        navigate("/customer/manage"); // 導航到客戶管理頁面
        /*window.location.reload();*/ // 可選：重新載入頁面來更新 UI
      } else {
        setError(data.error || "登入失敗，請檢查帳號和密碼");
      }
    } catch (err) {
      setError("伺服器連接失敗，請稍後再試");
    } finally {
      setIsSubmitting(false); // 恢復按鈕可用
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
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "登入中..." : "登入"}
          </Button>
          {error && <p className="text-danger mt-3">{error}</p>}
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
