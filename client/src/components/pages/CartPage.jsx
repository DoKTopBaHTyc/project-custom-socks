import emailjs from 'emailjs-com';
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

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    emailjs.init('DSNHD4PAdS860fPxU'); // Ваш User ID
  }, []);

  useEffect(() => {
    axiosInstance.get('/cart').then((res) => setCartItems(res.data));
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

  const sendOrderConfirmation = (email, orderDetails) => {
    // Форматируем данные для шаблона
    const templateParams = {
      to_email: email,
      order_id: `ORDER-${Date.now()}`,
      orders: orderDetails.items.map((item) => ({
        image_url: item.Sock.desingURL || 'https://via.placeholder.com/150',
        name: item.Sock.name,
        units: item.quantity,
        price: item.Sock.price.toFixed(2) * item.quantity, // Число без валюты (шаблон сам добавит $)
      })),
      cost: {
        shipping: '0.00', // Обязательно в формате "0.00"
        tax: '0.00', // Обязательно в формате "0.00"
        total: orderDetails.total.toFixed(2), // Форматируем с двумя знаками после запятой
      },
      email: email,
    };

    console.log('Параметры для письма:', templateParams);

    return emailjs.send('service_27vo5ls', 'template_3v42iry', templateParams);
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
      await sendOrderConfirmation('denisoid93@gmail.com', orderData);

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
      // Здесь можно добавить обработку ошибки для пользователя
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
                          <Col md={3}>
                            <Card.Img
                              variant="top"
                              src={el.Sock.desingURL}
                              alt={el.Sock.name}
                              className="img-fluid"
                            />
                          </Col>
                          <Col md={6}>
                            <Card.Title>{el.Sock.name}</Card.Title>
                            <Card.Text>
                              <strong>Стоимость:</strong> {el.Sock.price} ₽
                            </Card.Text>
                          </Col>
                          <Col md={3}>
                            <div className="d-flex align-items-center mb-2">
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
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleAddToFavorites(el.sockId)}
                                disabled={favorites.includes(el.sockId)}
                              >
                                <Heart />{' '}
                                {favorites.includes(el.sockId)
                                  ? 'В избранном'
                                  : 'Добавить в избранное'}
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
