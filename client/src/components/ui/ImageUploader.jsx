import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const ImageUploader = ({ setImageUrl }) => {
  const [loadedFile, setLoadedFile] = useState(null);
  const handleFileUpload = (e) => {
    if (!e.target.files[0]) return;
    console.log('Hello');

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result; // Данные в формате Base64
      setLoadedFile(base64String);
      //   localStorage.setItem('image', base64String); // Сохраняем в localStorage
      setImageUrl(base64String);
    };
    const file = e.target.files[0];
    reader.readAsDataURL(file);
  };

  return (
    <Form>
      <Form.Group controlId="formFile">
        <Form.Label>Выберите файл (размером не более 4 МБайт)</Form.Label>
        <Form.Control type="file" onChange={handleFileUpload} />
      </Form.Group>
      {loadedFile && (
        <div>
          <img
            src={loadedFile}
            alt="Загруженное изображение"
            style={{ maxWidth: '300px' }}
          />
        </div>
      )}
    </Form>
  );
};

export default ImageUploader;
