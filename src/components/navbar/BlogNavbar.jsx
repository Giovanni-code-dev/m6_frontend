import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { logoutUser } from "../../utils/api";
import { useNavigate } from "react-router-dom"

const NavBar = props => {

  const navigate = useNavigate()

  const logOut = () => {

    console.log("LOGOUT")
    logoutUser()
    navigate("/login")
  }

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>

        <div className="d-flex align-items-center">
          <Button as={Link} to="/new" className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-plus-lg me-2"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>
            Nuovo
          </Button>
          <Button className="btn btn-secondary ms-1" onClick={logOut}>
            logout
          </Button>
        </div>

      </Container>
    </Navbar>
  );
};

export default NavBar;
