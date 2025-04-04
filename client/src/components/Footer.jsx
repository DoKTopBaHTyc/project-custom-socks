import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Наш магазин</h3>
          <p className={styles.footerText}>
            г. Москва, ул. Пушкина, д. 123<br/>
            ТЦ "Носковский", 3 этаж
          </p>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Контакты</h3>
          <p className={styles.footerText}>
            Телефон: <a href="tel:+74951234567" className={styles.footerLink}>+7 (800) 555-35-35</a>
          </p>
          <p className={styles.footerText}>
            Email: <a href="mailto:support@sockcraft.ru" className={styles.footerLink}>support@nanoga.ru</a>
          </p>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Режим работы</h3>
          <p className={styles.footerText}>
            Пн-Пт: 10:00 - 20:00<br/>
            Сб-Вс: 11:00 - 19:00
          </p>
        </div>
      </div>
      
      <div className={styles.copyright}>
        © {new Date().getFullYear()} Nanoga. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
