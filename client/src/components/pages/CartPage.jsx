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
} from 'react-bootstrap';
import { Dash, Heart, Plus, Trash } from 'react-bootstrap-icons';
import axiosInstance from '../../api/axiosInstance';
import emailService from '../../api/emailService';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axiosInstance.get('/cart').then((res) => setCartItems(res.data));
    axiosInstance.get('/favorites').then((res) => {
      const favoriteSockIds = res.data.map((sock) => sock.id);
      setFavorites(favoriteSockIds);
    });
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
    quantityHandler(cartItemId, newQuantity);
  };

  const decrementQuantity = async (cartItemId, quantity) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      quantityHandler(cartItemId, newQuantity);
    }
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/cart/${id}`);
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleOrder = async () => {
    try {
      // 1. Подтверждаем заказ на сервере
      await axiosInstance.patch('/cart');

      // 2. Подготовка данных
      const orderData = {
        items: cartItems,
        total: calculateTotal(),
      };
      // 3. Отправка письма
      await emailService.sendOrderConfirmation('denisoid93@gmail.com', orderData);
      // 4. Обновление состояния
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

  return (
    <Container className="my-5">
      <h2 className="mb-4">Ваша корзина</h2>

      {cartItems.length === 0 && !orderStatus && (
        <Alert variant="info">Ваша корзина пуста</Alert>
      )}
      {orderStatus === 'success' ? (
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
                          {/* Изображение товара */}
                          <Col xs={4} md={3}>
                            <Card.Img
                              variant="top"
                              src={el.Sock.desingURL}
                              alt={el.Sock.name}
                              className="img-fluid"
                              style={{ maxHeight: '100px', objectFit: 'contain' }}
                            />
                          </Col>

                          {/* Название и цена */}
                          <Col xs={8} md={5}>
                            <Card.Title className="h6">{el.Sock.name}</Card.Title>
                            <Card.Text>
                              <strong>Цена:</strong> {el.Sock.price} ₽
                            </Card.Text>
                          </Col>

                          {/* Управление количеством и кнопки */}
                          <Col xs={12} md={4} className="mt-2 mt-md-0">
                            <div className="d-flex align-items-center mb-2 justify-content-center justify-content-md-start">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => decrementQuantity(el.id, el.quantity)}
                                disabled={el.quantity <= 1}
                                className="p-1"
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
                                className="p-1"
                              >
                                <Plus />
                              </Button>
                            </div>

                            <div className="mb-2 text-center text-md-start">
                              <strong>Сумма:</strong> {el.subTotal} ₽
                            </div>

                            <div className="d-flex justify-content-center justify-content-md-start gap-2">
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(el.id)}
                                className="p-1"
                              >
                                <Trash size={16} />
                              </Button>
                              <Button
                                variant={
                                  favorites.includes(el.sockId)
                                    ? 'outline-danger'
                                    : 'outline-secondary'
                                }
                                size="sm"
                                onClick={() => handleAddToFavorites(el.sockId)}
                                disabled={favorites.includes(el.sockId)}
                                className="p-1"
                              >
                                <Heart size={16} />
                                <span className="d-none d-md-inline ms-1">
                                  {favorites.includes(el.sockId)
                                    ? 'В избранном'
                                    : 'В избранное'}
                                </span>
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

            {/* Блок итогов */}
            <Col xs={12} md={4} className="mt-4 mt-md-0">
              <Card className="sticky-top" style={{ top: '20px' }}>
                <Card.Header>Итого</Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {cartItems.map((item) => (
                      <ListGroupItem
                        key={item.id}
                        className="d-flex justify-content-between"
                      >
                        <span className="text-truncate" style={{ maxWidth: '60%' }}>
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
