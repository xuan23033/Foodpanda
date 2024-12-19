import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    address: "",
    Email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 處理表單輸入變更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // 切換編輯模式
  const toggleEditing = () => setIsEditing(!isEditing);

  // 獲取使用者資料
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // 假設你有存 Token
        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data || {});
      } catch (error) {
        console.error("無法獲取使用者資料:", error);
        alert("載入資料失敗，請稍後再試");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 提交表單
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("資料已成功更新");
      setIsEditing(false);
    } catch (error) {
      console.error("更新失敗:", error);
      alert("資料更新失敗，請稍後再試");
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">資料載入中...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="text-center mb-4">
        <Col>
          <h3 className="profile-heading">個人檔案</h3>
          <p className="profile-subheading">檢視或更新您的個人資訊</p>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formName">
          <Form.Label column sm={3}>
            姓名
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              readOnly={!isEditing}
              plaintext={!isEditing}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPhone">
          <Form.Label column sm={3}>
            電話
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              readOnly={!isEditing}
              plaintext={!isEditing}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formAddress">
          <Form.Label column sm={3}>
            地址
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              readOnly={!isEditing}
              plaintext={!isEditing}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formEmail">
          <Form.Label column sm={3}>
            Email
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="email"
              name="Email"
              value={profile.email}
              onChange={handleChange}
              readOnly={!isEditing}
              plaintext={!isEditing}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPassword">
          <Form.Label column sm={3}>
            密碼
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              readOnly={!isEditing}
              plaintext={!isEditing}
            />
          </Col>
        </Form.Group>

        <Row className="mt-4">
          <Col sm={6}>
            <Button
              variant={isEditing ? "secondary" : "primary"}
              className="w-100"
              onClick={toggleEditing}
            >
              {isEditing ? "取消" : "編輯"}
            </Button>
          </Col>
          {isEditing && (
            <Col sm={6}>
              <Button type="submit" variant="success" className="w-100">
                儲存
              </Button>
            </Col>
          )}
        </Row>
      </Form>
    </Container>
  );
};

export default Profile;
