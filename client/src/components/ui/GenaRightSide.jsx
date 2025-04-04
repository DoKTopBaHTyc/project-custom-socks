import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import ImagesContainer from './ImagesContainer';
import { useColorContext } from '../../context/ColorContext';
import { usePatternContext } from '../../context/PatternContext';
import ColorPicker from './ColorPicker';
import PatternPicker from './PatternPicker';
import { useImageContext } from '../../context/ImageContext';

export default function GenaRightSide() {
  const [step, setStep] = useState(1);
  const [isUpToSave, setIsUpToSave] = useState(false);
  // const [storageFill, setStorageFill] = useState({
  //   color: false,
  //   pattern: false,
  //   image: false,
  // });
  const { selectedColor, selectColor } = useColorContext();
  const { selectedPattern, selectPattern } = usePatternContext();
  const { setImageUrl } = useImageContext();

  const onClickHandler = () => {
    localStorage.removeItem('image');
    localStorage.removeItem('color');
    localStorage.removeItem('pattern');
    selectColor('#bababa');
    selectPattern(null);

    // setStorageFill({ color: false, pattern: false, image: false });
  };

  const deleteImageHandler = () => {
    localStorage.removeItem('image');
    setImageUrl(null)
    // setStorageFill((prev) => ({ ...prev, image: false }));
  };

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
              </>
            ) : (
              <>
                <ImagesContainer />
                <Button
                  variant="secondary"
                  disabled={!isUpToSave}
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
              <Button variant="primary" disabled={!isUpToSave} onClick={onClickHandler}>
                Добавить в избранное
              </Button>
            </Col>
            <Col xs={6} className="d-flex justify-content-center">
              <Button variant="primary" disabled={!isUpToSave} onClick={onClickHandler}>
                Добавить в корзину
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}
