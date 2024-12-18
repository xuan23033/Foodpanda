import React, { useState, useContext } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../Contexts/AuthContext";
import LoginModal from "../customer/LoginModal";
import RegisterModal from "../customer/RegisterModal";
import "../../App.css";

const Navigation = ({ currentUser, userType }) => {
  const { logout } = useContext(AuthContext);
  
  // 控制 Modal 顯示的狀態
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
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
          <LinkContainer to="/customer/manage/cart" className="Navlink">
            <Nav.Link>Cart</Nav.Link>
          </LinkContainer>
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
          <Button onClick={handleShowLoginModal} className="form-button">
            登入 
          </Button>
          <Button onClick={handleShowRegisterModal} className="form-button">
            註冊
          </Button>

          {/* 顯示登入和註冊模態框 */}
          <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} handleSwitchToRegister={handleSwitchToRegister} />
          <RegisterModal show={showRegisterModal} handleClose={handleCloseRegisterModal} handleSwitchToLogin={handleSwitchToLogin} />
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
    </>
  );
};

export default Navigation;
