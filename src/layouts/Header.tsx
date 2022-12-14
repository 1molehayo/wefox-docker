import React from 'react';
// import classNames from "classnames";
import { ReactComponent as Logo } from 'assets/images/svgs/logo.svg';
import { ReactComponent as Menu } from 'assets/images/svgs/menu.svg';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Header = () => {
  return (
    <header className="header">
      <Navbar bg="light" expand="xl" sticky="top">
        <div className="navbar-primary">
          <Navbar.Brand href="/">
            <Logo width={105} height="auto" color="#501e96" />
          </Navbar.Brand>
        </div>

        <div className="navbar-secondary">
          <Navbar.Toggle aria-controls="navbarMainMenu1">
            <Menu width={30} height={30} />
          </Navbar.Toggle>
          <a
            target="_self"
            className="btn btn-subtle d-none d-xl-block me-2"
            href="https://my.wefox.com/de/login?locale=en_DE"
          >
            Login
          </a>

          <a
            target="_self"
            className="btn btn-primary d-none d-xl-block"
            href="https://safe.wefox.com?locale=en-de"
          >
            Get free advice
          </a>
        </div>

        <Navbar.Collapse id="navbarMainMenu1">
          <Nav className="me-auto">
            <NavDropdown title="Insurance products" id="products">
              <NavDropdown.Item href="https://www.wefox.com/en-de/insurance-products/motor">
                Car
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.wefox.com/en-de/insurance-products/liability">
                Private liability
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.wefox.com/en-de/insurance-products/household">
                House contents
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.wefox.com/en-de/insurance-products/homeowner">
                Homeowner
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="https://www.wefox.com/en-de/claims">
              Claims
            </Nav.Link>

            <NavDropdown title="About wefox" id="about">
              <NavDropdown.Item href="https://www.wefox.com/en-de/why-wefox">
                Why wefox
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.wefox.com/en-de/about/leadership">
                Leadership team
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.wefox.com/en-de/careers">
                Careers
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="https://www.wefox.com/en-de/support">
              Support
            </Nav.Link>

            <Nav.Link
              href="https://my.wefox.com/de/login?locale=en_DE"
              className="d-xl-none mb-3"
            >
              Login
            </Nav.Link>

            <Nav.Link
              className="d-xl-none btn btn-primary mb-3"
              href="https://safe.wefox.com?locale=en-de"
            >
              Get free advice
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
