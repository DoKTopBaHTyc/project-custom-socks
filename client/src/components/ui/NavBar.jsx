import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './NavBar.module.css';
import logo from './Nanoga.png'; // Используйте относительный путь

export default function NavBar({ user, logoutHandler }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={styles.navbar}>
      <Container>
        {/* Логотип слева отдельно от текста */}
        <Navbar.Brand as={Link} to="/" className="me-0">
          <img 
            src={logo} 
            alt="Логотип SockCraft" 
            className={styles.logo}
            width={119}
            height={39}
          />
        </Navbar.Brand>
        
        {/* Текст "Кастомные носки" как отдельная ссылка */}
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className={styles.navLink}>
            Главная
          </Nav.Link>
        </Nav>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggle} />

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

