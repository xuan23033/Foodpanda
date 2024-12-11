import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ResturantCollection from "./ResturantCollection";
import AuthModal from "../customer/AuthModal";
import FAQ from "./FAQ";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [address, setAddress] = React.useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [restaurants, setRestaurants] = useState([]);

  const handleShowLogin = () => {
    setIsLogin(true);
    setShowModal(true);
  };

  const handleShowRegister = () => {
    setIsLogin(false);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  
  useEffect(() => {
    if (
      localStorage.getItem("currentUser") &&
      localStorage.getItem("userType")
    ) {
      if (localStorage.getItem("userType") === "restaurant") {
        window.location.href = "/resturant/manage";
      } else if (localStorage.getItem("userType") === "customer") {
        window.location.href = "/customer/manage";
      }
    }
  }, []);

  //const handleSearch = () => {
  //  if (address.trim() === "") {
  //    alert("請輸入地址！");
  //    return;
  //  }
  //  navigate(`/restaurants?address=${encodeURIComponent(address)}`);
  //};

  // 獲取當前定位的處理函數
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("您的瀏覽器不支援定位功能！");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        navigate(`/restaurants?lat=${latitude}&lng=${longitude}`);
      },
      (error) => {
        alert("無法獲取您的定位：" + error.message);
      }
    );
  };

  const handleSearch = () => {
    if (address.trim() === "") {
      alert("請輸入地址！");
      return;
    }
    fetch(`http://localhost/api/restaurants?address=${encodeURIComponent(address)}`)
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error("Failed to fetch restaurants:", error));
  };

  return (
    <>

    <div className="homepage">
      <h1>歡迎來到 Food Delivery 平台</h1>
      <Button
        variant="primary"
        className="me-3"
        onClick={() => navigate("/restaurants")}
      >
        瀏覽餐廳
      </Button>
      <Button
        variant="secondary"
        className="me-3"
        onClick={() => navigate("/login")}
      >
        登入
      </Button>
      <Button
        variant="success"
        onClick={() => navigate("/register")}
      >
        註冊
      </Button>
    </div>
    
      <AuthModal
        show={showModal}
        handleClose={handleCloseModal}
        isLogin={isLogin}
      />

      <div
        className="position-relative"
        style={{
          height: "300px",
          backgroundColor: "#f8f9fa", 
        }}
      >
      <img
        className="d-block float-end"
        src="https://images.deliveryhero.io/image/foodpanda/homepage/refresh-hero-home-tw.png?width=528"
        alt="First slide"
        style={{
            transform: "translateY(0%)",
            maxHeight: "100%",
            maxWidth: "50%",
        }}
      />
      </div>

      <Container className="my-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Form>
              <Form.Group controlId="addressInput">
                <Form.Label>輸入地址以搜尋附近餐廳</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="輸入地址以搜尋附近餐廳"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="mt-3"
                onClick={handleSearch}
                block
              >
                搜尋美食
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container className="mb-3 homecontainer">
        <Row>
          <Col md={12}>
            <div>
              <h4 className="mt-5">
                我們有在這邊提供送餐服務!!!
              </h4>
              <Row xs={1} md={12} className="g-4 m-3">
                <ResturantCollection></ResturantCollection>
              </Row>
            </div>
          </Col>
          <Col md={12} className="AccordationCollection">
            <h4 className="mb-3">常見問題</h4>
            <FAQ></FAQ>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
