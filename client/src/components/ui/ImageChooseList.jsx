import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Button, Col, Row } from 'react-bootstrap';

export default function ImageChooseList({ setImageUrl }) {
  const [images, setImages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get('/gensock/images');
        setImages(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке изображений:', error);
      }
    };

    fetchImages();
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id === selectedId ? null : id);
    const image = images.find((img) => img.id === id);
    if (image.url) {
      setImageUrl(`/data${image.url}`);
    } else alert('Выберите изображение!');
  };

  return (
    <Row>
      {images.map((image) => (
        <Col key={image.id} xs={6}>
          <Button
            onClick={() => handleSelect(image.id)}
            style={{
              padding: 0,
              background: 'none',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              display: 'block',
              overflow: 'hidden',
              marginBottom: '24px',
              width: '100%',
              border:
                selectedId === image.id
                  ? '3px solid var(--bs-primary)'
                  : '3px solid transparent',
              transition: 'all 0.3s ease',
            }}
          >
            <img
              src={`/data${image.url}`}
              alt={`Шаблон №${image.id}`}
              style={{
                width: '100%',
                display: 'block',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </Button>
        </Col>
      ))}
    </Row>
  );
}
