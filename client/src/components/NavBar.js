import React,{ useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { userContext } from "../App";



const NavBar = () => {
  const { state } = useContext(userContext);

  const RenderMenu = () => {

    if (state.isLoggedIn) {
      return (
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/" className={style.login}>
                 Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/" className={style.login}>
                 Feature
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/" className={style.login}>
                 Pricing
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/" className={style.login}>
                 Feedback
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/" className={style.login}>
                 Contact
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/auction" className={style.login}>
                 Auction
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>
              <Link to="/about" className={style.login}>
                {state.userEmail}
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/logout" className={style.login}>
                Logout
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      );
    } else {
      return (
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=> window.location.replace("/#home")}> Home </Nav.Link>
            <Nav.Link onClick={()=> window.location.replace("/#features")}>Features</Nav.Link>
            <Nav.Link onClick={()=> window.location.replace("/#pricing")}>Pricing</Nav.Link>
            <Nav.Link onClick={()=> window.location.replace("/#feedback")}>Feedback</Nav.Link>
            <Nav.Link onClick={()=> window.location.replace("/#contact")}>Contact</Nav.Link>
            <Nav.Link>
              <Link to="/auction" className={style.login}>
                 Auction
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
            {/* <Link to="/login"> */}
            <Nav.Link>
              <Link to="/login" className={style.login}>
                Login
              </Link>
            </Nav.Link>
            <Nav.Link eventKey={2}>
              <Link to="/register" className={style.register}>
                Register
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      );
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="#home">bikeAdda</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <RenderMenu />
      </Container>
    </Navbar>
  );
};

export default NavBar;
