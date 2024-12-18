import React, { useState, useContext } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../Contexts/AuthContext";
import AuthModal from "../customer/AuthModal";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Navigation = ({ currentUser, userType }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate(); // 使用 useNavigate 來跳轉頁面

  //控制 Modal 顯示的狀態
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true); //默認顯示登入表單

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const toggleAuthMode = () => setIsLogin(!isLogin); // 切換登入和註冊表單

  const goToCart = () => {
    navigate("/customer/manage/cart");
  };

  const renderLinks = (currentUser, userType, logout) => {
    if (currentUser === "true" && userType === "restaurant") {
      return (
        <>
          <LinkContainer to="/resturant/manage" className="Navlink">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/resturant/manage/orders" className="Navlink">
            <Nav.Link>Manage Orders</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/resturant/manage/menu">
            <Nav.Link>Manage Menu</Nav.Link>
          </LinkContainer>
          <Button onClick={logout} className="logout-button">
            Logout
          </Button>
        </>
      );
    } else if (currentUser === "true" && userType === "customer") {
      return (
        <>
          <LinkContainer to="/customer/manage" className="Navlink">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/customer/manage/order" className="Navlink">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/customer/manage/status" className="Navlink">
            <Nav.Link>View Orders</Nav.Link>
          </LinkContainer>
          <Button onClick={goToCart} className="form-button">
            Go to Cart
          </Button>
          <Button onClick={logout} className="logout-button">
            Logout
          </Button>
        </>
      );
    } else {
      return (
        <>
          <LinkContainer to="/" className="Navlink">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <Button onClick={handleShowModal} className="form-button">
            Login / Sign Up
          </Button>
        </>
      );
    }
  };

  return (
    <>
      <Navbar expand="lg" className="Navbar" variant="dark">
        <Container>
          <Navbar.Brand>foodpanda</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="me-auto justify-content-end"
              style={{ width: "100%" }}
            >
              {renderLinks(currentUser, userType, logout)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <AuthModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        isLogin={isLogin} 
        toggleAuthMode={toggleAuthMode} 
      />
    </>
  );
};

export default Navigation;