import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import ImagesContainer from './ImagesContainer';

export default function GenaRightSide() {
  const [step, setStep] = useState(1);
  const [isUpToSave, setIsUpToSave] = useState(false);
  const [storageFill, setStorageFill] = useState({
    color: false,
    pattern: false,
    image: false,
  });

  const onClickHandler = () => {
    localStorage.removeItem('image');
    localStorage.removeItem('color');
    localStorage.removeItem('pattern');
    setStorageFill({ color: false, pattern: false, image: false });
  };

  useEffect(() => {
    if (storageFill.image) {
      setIsUpToSave(true);
    } else if (!localStorage.image) {
      setIsUpToSave(false);
    }
  }, [storageFill]);

  useEffect(() => {
    return () => {
      if (localStorage.image || localStorage.color || localStorage.patter) {
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
              <div>Hello, this is step 1</div>
            ) : step === 2 ? (
              <div>Hello, this is step 2</div>
            ) : (
              <ImagesContainer
                storageFill={storageFill}
                setStorageFill={setStorageFill}
              />
            )}
          </Card.Body>
          <Row className="align-items-center" style={{marginBottom:"1rem"}}>
            <Col xs={6} className="d-flex justify-content-center">
              <Button variant="primary" disabled={!isUpToSave} onClick={onClickHandler}>
                Создать дизайн
              </Button>
            </Col>
            <Col xs={6} className="d-flex justify-content-center">
              <Button variant="primary" disabled={!isUpToSave} onClick={onClickHandler}>
                Создать дизайн
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}
