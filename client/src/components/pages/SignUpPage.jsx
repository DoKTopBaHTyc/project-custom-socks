import React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, Navigate } from 'react-router';

export default function SignUpPage({ signupHandler, user }) {
  if (user) return <Navigate to="/" />;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Регистрация</h2>
              <Form onSubmit={signupHandler}>
                <Form.Group className="mb-3">
                  <Form.Label>Имя</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Введите имя"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Введите email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Введите пароль"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Повторите пароль</Form.Label>
                  <Form.Control
                    name="repeatPassword"
                    type="password"
                    placeholder="Повторите пароль"
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Зарегистрироваться
                  </Button>
                </div>

                <p className="text-center mt-4 mb-0">
                  Уже есть аккаунт?{' '}
                  <Link to="/login" className="text-primary text-decoration-none">
                    Войти
                  </Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
