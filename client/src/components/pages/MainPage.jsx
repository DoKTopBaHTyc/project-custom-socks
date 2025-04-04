import React from 'react';
import { useNavigate } from 'react-router';
import styles from './MainPage.module.css';

export default function MainPage() {
  const navigate = useNavigate();

  const handleDesignClick = () => {
    navigate('/gensock');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Создайте носки своей мечты — уникальные, как вы!</h1>
      
      <p className={styles.welcomeText}>
        Добро пожаловать в Nanoga — место, где рождаются самые смелые, стильные и необычные носки!
      </p>
      
      <div className={styles.features}>
        <div className={styles.featureItem}>
          Соберите идеальную пару – выберите цвет, узор и даже добавьте свой принт
        </div>
        <div className={styles.featureItem}>
          Носите с гордостью – ваш дизайн, ваша индивидуальность
        </div>
        <div className={styles.featureItem}>
          Дарите эмоции – закажите носки с фото, надписью или тематическим рисунком
        </div>
      </div>
      
      <div className={styles.ctaBlock}>
        <p>Начните прямо сейчас! Просто нажмите "Создать дизайн"</p>
        <button 
          className={styles.transparentButton}
          onClick={handleDesignClick}
        >
          Создать дизайн
        </button>
      </div>
      

    </div>
  );
}