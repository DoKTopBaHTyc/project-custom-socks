import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Button from 'react-bootstrap/Button';

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
    console.log(likes);
  };

  console.log(likes);

  return (
    <div>
      <ul>
        {likes.map((el) => (
          <li key={el.id}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhhpxZZsBlonSvdpCjOrF1DzFe2TtLVLA6Yw&s"
              alt=""
            />
            {el.name}
            {el.price}
            <Button variant="danger" onClick={() => deleteHandler(el.id)}>
              Удалить
            </Button>
            <Button variant="success">Добавить в корзину</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
