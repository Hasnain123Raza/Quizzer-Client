import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { sGetIsAuthenticated } from "../../services/authenticatedSlice/selectors.js";
import React from "react";

export default function () {
  const isAuthenticated = useSelector(sGetIsAuthenticated);

  return (
    <div className="header">
      <Navbar bg="dark" variant="dark">
        <LinkContainer exact to="/">
          <Navbar.Brand>
            <h3>Quizzer</h3>
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="d-none d-md-inline-flex" style={{ flex: 1 }}>
          <LinkContainer exact to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/quiz/browse">
            <Nav.Link>Browse</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/quiz/create">
            <Nav.Link>Create</Nav.Link>
          </LinkContainer>
          {isAuthenticated ? (
            <LinkContainer className="ml-auto" to="/authentication/account">
              <Nav.Link>Account</Nav.Link>
            </LinkContainer>
          ) : (
            <React.Fragment>
              <LinkContainer className="ml-auto" to="/authentication/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/authentication/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </React.Fragment>
          )}
        </Nav>

        <Nav className="ml-auto d-md-none">
          <NavDropdown title="Menu">
            <LinkContainer exact to="/">
              <NavDropdown.Item>Home</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/quiz/browse">
              <NavDropdown.Item>Browse</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/quiz/create">
              <NavDropdown.Item>Create</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            {isAuthenticated ? (
              <LinkContainer to="/authentication/account">
                <NavDropdown.Item>Account</NavDropdown.Item>
              </LinkContainer>
            ) : (
              <React.Fragment>
                <LinkContainer to="/authentication/login">
                  <NavDropdown.Item>Login</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/authentication/register">
                  <NavDropdown.Item>Register</NavDropdown.Item>
                </LinkContainer>
              </React.Fragment>
            )}
          </NavDropdown>
        </Nav>
      </Navbar>
    </div>
  );
}
