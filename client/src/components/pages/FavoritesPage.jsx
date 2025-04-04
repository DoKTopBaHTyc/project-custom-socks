import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import styles from '../pages/FavoritePage.module.css';
import { Heart, Trash, Cart } from 'react-bootstrap-icons';

export default function FavoritesPage({ user }) {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    axiosInstance.get('/favorites').then((res) => {
      setLikes(res.data);
    });
  }, []);

  const deleteHandler = async (id) => {
    await axiosInstance.delete(`/favorites/${id}`);
    setLikes((prev) => prev.filter((el) => el.id !== id));
  };

  const onCLickHandler = async (id) => {
    await axiosInstance.post(`/favorites/cart/${id}`);
  };

  const triggerError = () => {
    throw new Error('Это тестовая ошибка для Error Boundary!');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Избранные товары</h2>

      {likes.map((el) => (
        <div key={el.id} className={styles.favoriteCard}>
          <img
            src={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhhpxZZsBlonSvdpCjOrF1DzFe2TtLVLA6Yw&s'
            }
            alt={el.name}
            className={styles.productImage}
          />

          <div className={styles.productInfo}>
            <div>
              <h4 className={styles.productName}>{el.name}</h4>
              <p className={styles.productPrice}>Цена: {el.price} руб.</p>
            </div>

            <div className={styles.buttonGroup}>
              <button
                className={`${styles.outlineButton} ${styles.outlineDanger}`}
                onClick={() => deleteHandler(el.id)}
              >
                <Trash size={14} /> Удалить
              </button>
              <button
                className={`${styles.outlineButton} ${styles.outlinePrimary}`}
                onClick={() => onCLickHandler(el.id)}
              >
                <Cart size={14} /> В корзину
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
