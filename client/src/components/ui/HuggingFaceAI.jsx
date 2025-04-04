import React, { useState } from 'react';
import axios from 'axios';

function HuggingFaceAI({ setImageUrl }) {
  const [prompt, setPrompt] = useState('');
  const [createdImage, setCreatedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const HF_API_KEY = import.meta.env.VITE_HUGGING_FACE_API; // Замените на свой ключ в .env
  const MODEL_ID = import.meta.env.VITE_AI_MODEL; // Или другая модель в .env

  const translateWithMyMemory = async (text, langPair = 'ru|en') => {
    const response = await axios(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text,
      )}&langpair=${langPair}`,
    );
    return response.data.responseData.translatedText;
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Введите описание изображения');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const translatedText = await translateWithMyMemory(prompt, 'ru|en');
      console.log('Original text:', prompt, '--||-- translated text:', translatedText);
      const newImage = '/data/patterns/img2.png'; // удалить в проде
      // раскомментить в проде
      // const response = await axios.post(
      //   `https://api-inference.huggingface.co/models/${MODEL_ID}`,
      //   { inputs: translatedText },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${HF_API_KEY}`,
      //     },
      //     responseType: 'blob',
      //   },
      // );

      // const newImage = URL.createObjectURL(response.data);
      setCreatedImage(newImage);
      setImageUrl(newImage)
    } catch (err) {
      console.error('Ошибка генерации:', err);
      setError('Не удалось создать изображение. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3>Введите Ваш запрос ниже</h3>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Например: 'Космический кот в очках'"
        style={{ width: '100%', padding: '10px' }}
      />
      <button
        onClick={generateImage}
        disabled={isLoading}
        style={{ margin: '10px 0', padding: '10px 20px' }}
      >
        {isLoading ? 'Генерация...' : 'Создать'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {createdImage && (
        <div>
          <h3>Результат:</h3>
          <img
            src={createdImage}
            alt="Сгенерированное изображение"
            style={{ maxWidth: '100%' }}
          />
        </div>
      )}
    </div>
  );
}

export default HuggingFaceAI;
