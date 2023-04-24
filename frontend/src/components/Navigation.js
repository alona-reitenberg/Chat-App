import React from "react";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/chat-logo.png";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((state) => state.user); //can see if the user is null or not
  const [logoutUser] = useLogoutUserMutation();
  async function handleLogout(e) {
    e.preventDefault();
    await logoutUser(user);
    // redirect to home page
    window.location.replace("/");
  }
  return (
    <Navbar className="color-nav" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} style={{ width: 40, height: 40 }} alt="Logo" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* if there is not user logged in so show the login link on the bar */}

            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {!user && (
              <LinkContainer to="/signup">
                <Nav.Link>SingUp</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/chat">
              <Nav.Link>Chat</Nav.Link>
            </LinkContainer>
            {/* if there the user logged in so show actions tab and the user name and his picture */}
            {user && (
              <NavDropdown
                title={
                  <>
                    <img
                      src={user.picture}
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                    {user.name}
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/Settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
