import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './NavBar.module.css';

export default function NavBar({ user, logoutHandler }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          Кастомные носки
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className={styles.toggle}
        >
          <span className={styles.toggleIcon}></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/gensock" className={styles.navLink}>
                  Создать носки
                </Nav.Link>
                <Nav.Link as={Link} to="/favorites" className={styles.navLink}>
                  Избранное
                </Nav.Link>
                <Nav.Link as={Link} to="/cart" className={styles.navLink}>
                  Корзина
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <span className={styles.userGreeting}>Привет, {user.name}!</span>
                <Button 
                  variant="outline-light" 
                  onClick={logoutHandler}
                  className={styles.outlineButton}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/" className={styles.navLink}>
                  Главная
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="me-2">
                  <Button variant="outline-light" className={styles.outlineButton}>
                    Войти
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <Button variant="light" className={styles.solidButton}>
                    Регистрация
                  </Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
