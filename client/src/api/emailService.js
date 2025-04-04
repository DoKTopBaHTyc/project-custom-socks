import emailjs from 'emailjs-com';

class EmailService {
  constructor() {
    this.init();
  }

  init() {
    emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);
  }

  sendOrderConfirmation(email, orderDetails) {
    const templateParams = {
      to_email: email,
      order_id: `ORDER-${Date.now()}`,
      orders: orderDetails.items.map((item) => ({
        image_url: item.Sock.desingURL || 'https://via.placeholder.com/150',
        name: item.Sock.name,
        units: item.quantity,
        price: item.Sock.price.toFixed(2) * item.quantity,
      })),
      cost: {
        shipping: '0.00',
        tax: '0.00',
        total: orderDetails.total.toFixed(2),
      },
      email: email,
    };

    console.log('Параметры для письма:', templateParams);

    return emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
    );
  }
}

export default new EmailService();
