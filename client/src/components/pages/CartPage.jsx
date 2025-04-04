import React, { useEffect, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner
} from 'react-bootstrap';
import { Dash, Heart, Plus, Trash } from 'react-bootstrap-icons';
import axiosInstance from '../../api/axiosInstance';
import emailService from '../../api/emailService';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartRes, favoritesRes] = await Promise.all([
          axiosInstance.get('/cart'),
          axiosInstance.get('/favorites')
        ]);
        setCartItems(cartRes.data);
        setFavorites(favoritesRes.data.map((sock) => sock.id));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  async function quantityHandler(cartItemId, quantity) {
    await axiosInstance.patch(`/cart/${cartItemId}`, { quantity });
    setCartItems(
      cartItems.map((item) =>
        item.id === cartItemId
          ? { ...item, quantity, subTotal: item.Sock.price * quantity }
          : item,
      ),
    );
  }

  const incrementQuantity = async (cartItemId, quantity) => {
    const newQuantity = quantity + 1;
    await quantityHandler(cartItemId, newQuantity);
  };

  const decrementQuantity = async (cartItemId, quantity) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      await quantityHandler(cartItemId, newQuantity);
    }
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/cart/${id}`);
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleOrder = async () => {
    try {
      await axiosInstance.patch('/cart');
      const orderData = {
        items: cartItems,
        total: calculateTotal(),
      };
      await emailService.sendOrderConfirmation('denisoid93@gmail.com', orderData);
      setCartItems(
        cartItems.map((item) => ({
          ...item,
          Order: { ...item.Order, isOrdered: true },
        })),
      );
      setOrderStatus('success');
    } catch (error) {
      console.error('Ошибка оформления:', error);
    }
  };

  const handleAddToFavorites = async (sockId) => {
    await axiosInstance.post(`/cart/${sockId}`);
    setFavorites([...favorites, sockId]);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.Sock.price * item.quantity, 0);
  };

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" role="status" style={{ width: '4rem', height: '4rem' }}>
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Ваша корзина</h2>

      {cartItems.length === 0 && !orderStatus ? (
        <Alert variant="info">Ваша корзина пуста</Alert>
      ) : orderStatus === 'success' ? (
        <Alert variant="success" className="text-center">
          <Alert.Heading>Заказ успешно оформлен!</Alert.Heading>
          <p>Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время.</p>
        </Alert>
      ) : (
        <>
          <Row>
            <Col md={8}>
              <ListGroup>
                {cartItems.map((el) => (
                  <ListGroupItem key={el.id} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Row className="align-items-center">
                          <Col xs={4} md={3}>
                            <Card.Img
                              variant="top"
                              src={el.Sock.desingURL}
                              alt={el.Sock.name}
                              className="img-fluid"
                              style={{ maxHeight: '100px', objectFit: 'contain' }}
                            />
                          </Col>
                          <Col xs={8} md={5}>
                            <Card.Title className="h6">{el.Sock.name}</Card.Title>
                            <Card.Text>
                              <strong>Цена:</strong> {el.Sock.price} ₽
                            </Card.Text>
                          </Col>
                          <Col xs={12} md={4} className="mt-2 mt-md-0">
                            <div className="d-flex align-items-center mb-2 justify-content-center justify-content-md-start">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => decrementQuantity(el.id, el.quantity)}
                                disabled={el.quantity <= 1}
                              >
                                <Dash />
                              </Button>
                              <Badge bg="light" text="dark" className="mx-2">
                                {el.quantity}
                              </Badge>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => incrementQuantity(el.id, el.quantity)}
                              >
                                <Plus />
                              </Button>
                            </div>
                            <div className="mb-2">
                              <strong>Сумма:</strong> {el.subTotal} ₽
                            </div>
                            <div className="d-flex">
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(el.id)}
                                className="me-2"
                              >
                                <Trash /> Удалить
                              </Button>
                              <Button
                                variant={favorites.includes(el.sockId) ? "outline-danger" : "outline-secondary"}
                                size="sm"
                                onClick={() => handleAddToFavorites(el.sockId)}
                                disabled={favorites.includes(el.sockId)}
                              >
                                <Heart />{' '}
                                {favorites.includes(el.sockId)
                                  ? 'В избранном'
                                  : 'В избранное'}
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Header>Итого</Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {cartItems.map((item) => (
                      <ListGroupItem
                        key={item.id}
                        className="d-flex justify-content-between"
                      >
                        <span>
                          {item.Sock.name} x {item.quantity}
                        </span>
                        <span>{item.subTotal} ₽</span>
                      </ListGroupItem>
                    ))}
                    <ListGroupItem className="d-flex justify-content-between fw-bold">
                      <span>Общая сумма:</span>
                      <span>{calculateTotal()} ₽</span>
                    </ListGroupItem>
                  </ListGroup>
                  {cartItems.length > 0 && (
                    <Button
                      variant="primary"
                      className="w-100 mt-3"
                      onClick={handleOrder}
                    >
                      Оформить заказ
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}