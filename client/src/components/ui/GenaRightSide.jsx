import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import ImagesContainer from './ImagesContainer';
import { useColorContext } from '../../context/ColorContext';
import { usePatternContext } from '../../context/PatternContext';
import ColorPicker from './ColorPicker';
import PatternPicker from './PatternPicker';
import { useImageContext } from '../../context/ImageContext';
import axios from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router';

export default function GenaRightSide({ user }) {
  const [step, setStep] = useState(1);
  const [isUpToSave, setIsUpToSave] = useState(false);
  const { selectedColor, selectColor } = useColorContext();
  const { selectedPattern, selectPattern } = usePatternContext();
  const { imageUrl, setImageUrl } = useImageContext();
  const navigate = useNavigate();

  async function getLastDesignId() {
    try {
      const lastDesign = await axiosInstance.get('/gensock/designs');
      return lastDesign.data.id + 1;
    } catch (error) {
      throw new Error('Ошибка сохранения изображения');
    }
  }

  async function saveGeneratedImage(image) {
    try {
      console.log(image);
      if (!image) return { url: null };
      let blob;
      const imageId = await getLastDesignId();
      if (typeof image === 'string') {
        if (/data:image\//.test(image)) {
          // Для Base64
          const response = await fetch(image);
          blob = await response.blob();
        } else if (/\/data\/patterns/.test(image)) {
          return { url: image };
        } else {
          // Для URL
          const response = await axios.get(image, { responseType: 'blob' });
          blob = response.data;
        }
      } else if (image instanceof Blob) {
        blob = image;
      } else {
        throw new Error('Unsupported image type');
      }

      const file = new File([blob], `saved-image-${imageId}.png`, {
        type: 'image/png',
      });

      const formData = new FormData();
      formData.append('image', file);

      // Ключевое исправление - правильные заголовки
      const response = await axiosInstance.post('/saveimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      throw error;
    }
  }

  const onClickHandler = async () => {
    const design = await saveGeneratedImage(imageUrl);
    console.log(design.url);

    localStorage.removeItem('image');
    localStorage.removeItem('color');
    localStorage.removeItem('pattern');
    selectColor('#bababa');
    selectPattern(null);
  };

  const deleteImageHandler = () => {
    localStorage.removeItem('image');
    setImageUrl(null);
  };

  async function createDesign() {
    try {
      const newSockId = await getLastDesignId();
      const name = 'Exclusive Name!';
      let price = 400;
      if (selectedPattern) price += 100;
      if (imageUrl) price += 250;
      console.log(user);
      if (user.id && price && selectedColor) {
        const allColors = await axiosInstance.get(`/gensock/colors`);
        // const allPatterns = await axiosInstance.get(`/gensock/patterns`);
        const color = allColors.data.find((color) => color.hex === selectedColor);
        // const pattern = allPatterns.data.find((pattern) => pattern.url === imageUrl);
        // console.log(selectedPattern, allPatterns.data);
        const sock = await axiosInstance.post('/gensock/designs', {
          userId: user.id,
          name,
          price,
          colorId: color.id || null,
          patternId: selectedPattern.id || null,
          designUrl: imageUrl || null,
        });
        return { ...sock, id: newSockId };
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function addToCart() {
    try {
      const sock = await createDesign();
      await axiosInstance.post(`favorites/cart/${sock.id}`);
      navigate('/cart');
    } catch (error) {
      console.error(error);
    }
  }

  async function addToFav() {
    try {
      const sock = await createDesign();
      await axiosInstance.post(`favorites/:${sock.id}`);
      navigate('/favorites');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (selectedColor && selectedColor !== '#bababa' && selectedPattern) {
      localStorage.setItem('color', selectedColor);
      localStorage.setItem('pattern', selectedPattern.url);
      console.log(selectedColor, selectedPattern.url);
      setIsUpToSave(true);
    } else {
      setIsUpToSave(false);
    }
  }, [selectedColor, selectedPattern]);

  useEffect(() => {
    return () => {
      if (localStorage.image || localStorage.color) {
        localStorage.removeItem('image');
        localStorage.removeItem('color');
        localStorage.removeItem('pattern');
      }
    };
  }, []);

  return (
    <>
      <Container>
        <Card>
          <Card.Header>
            <Button
              onClick={() => setStep(1)}
              variant="primary"
              style={{ marginRight: '1rem' }}
            >
              Цвет
            </Button>
            <Button
              onClick={() => setStep(2)}
              variant="primary"
              style={{ marginRight: '1rem' }}
            >
              Узор
            </Button>
            <Button onClick={() => setStep(3)} variant="primary">
              Ваше изображение
            </Button>
          </Card.Header>
          <Card.Body>
            {step === 1 ? (
              <>
                <span>
                  <ColorPicker />
                </span>
                {selectedColor && <div>Выбранный цвет: {selectedColor}</div>}
              </>
            ) : step === 2 ? (
              <>
                <span>
                  <PatternPicker />
                </span>
                {selectedPattern && (
                  <div>
                    Выбранный паттерн: {selectedPattern.url || 'Неизвестный паттерн'}
                  </div>
                )}

                <Button
                  variant="secondary"
                  disabled={!selectedPattern}
                  onClick={() => selectPattern(null)}
                  style={{ width: '100%', marginTop: '0.7rem', justifySelf: 'center' }}
                >
                  Убрать узор
                </Button>
              </>
            ) : (
              <>
                <ImagesContainer />
                <Button
                  variant="secondary"
                  disabled={!imageUrl}
                  onClick={deleteImageHandler}
                  style={{ width: '100%', marginTop: '0.7rem', justifySelf: 'center' }}
                >
                  Убрать картинку
                </Button>
              </>
            )}
          </Card.Body>
          <Row className="align-items-center" style={{ marginBottom: '1rem' }}>
            <Col xs={6} className="d-flex justify-content-center">
              <Button
                variant="primary"
                disabled={!isUpToSave}
                onClick={(e) => {
                  onClickHandler(e);
                  addToFav;
                }}
              >
                Добавить в избранное
              </Button>
            </Col>
            <Col xs={6} className="d-flex justify-content-center">
              <Button
                variant="primary"
                disabled={!isUpToSave}
                onClick={(e) => {
                  onClickHandler(e);
                  addToCart();
                }}
              >
                Добавить в корзину
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}
