import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Modal, Form } from 'react-bootstrap';
import HuggingFaceAI from './HuggingFaceAI';
import ImageUploader from './ImageUploader';
import ImageChooseList from './ImageChooseList';
import { useImageContext } from '../../context/ImageContext'; 


export default function ImagesContainer() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const { imageUrl, setImageUrl } = useImageContext();

  const handleClose = () => setShowModal(false);
  const handleShow = (contentType) => {
    setModalContent(contentType);
    setShowModal(true);
  };

  const onClickHandler = () => {
    if (imageUrl) {
      localStorage.setItem('image', imageUrl);
      // setStorageFill((prevStorage) => ({ ...prevStorage, image: true }));
    }
    setShowModal(false);
  };

  // useEffect(() => {
  //   if (imageUrl) {
  //     setStorageFill((prevStorage) => ({ ...prevStorage, image: true }));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (showModal === false) {
  //     if (localStorage.image && storageFill.image !== true) {
  //       setStorageFill((prev) => (prev.image = true));
  //       console.log(showModal);
  //     }
  //   }
  // }, [showModal]);

  // Ваши пресеты для Link1 (можно заменить на свои)

  return (
    <div>
      <ListGroup defaultActiveKey="#link1">
        <ListGroup.Item action onClick={() => handleShow('presets')}>
          Выбрать из вариантов
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => handleShow('upload')}>
          Загрузить с компьютера
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => handleShow('ai')}>
          Сгенерировать картинку с помощью AI
        </ListGroup.Item>
      </ListGroup>

      <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalContent === 'presets' && 'Выберите вариант'}
            {modalContent === 'upload' && 'Загрузите изображение'}
            {modalContent === 'ai' && 'Генератор изображений (Hugging Face)'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent === 'presets' && <ImageChooseList setImageUrl={setImageUrl} />}

          {modalContent === 'upload' && <ImageUploader setImageUrl={setImageUrl} />}

          {modalContent === 'ai' && <HuggingFaceAI setImageUrl={setImageUrl} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Я передумал
          </Button>
          <Button variant="primary" onClick={onClickHandler}>
            {modalContent === 'upload'
              ? 'Загрузить в макет'
              : 'Добавить картинку в макет'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
