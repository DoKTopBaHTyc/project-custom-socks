import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';

export default function NavBar({ user, logoutHandler }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Кастомные носки
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/gensock">
                  Создать носки
                </Nav.Link>
                <Nav.Link as={Link} to="/favorites">
                  Избранное
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  Корзина
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <span className="navbar-text me-3">Привет, {user.name}!</span>
                <Button variant="outline-light" onClick={logoutHandler}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Главная
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="me-2">
                  <Button variant="outline-light">Войти</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <Button variant="light">Регистрация</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
