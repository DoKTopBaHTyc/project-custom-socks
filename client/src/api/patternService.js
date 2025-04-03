import axiosInstance from './axiosInstance';

export default class PatternService {
  static async getAllPatterns() {
    try {
      const response = await axiosInstance('/gensock/patterns');
      if (response.status !== 200) throw new Error('Неверный статус (ожидался 200)');
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении паттернов:', error.message);
      if (error.response) {
        console.error('Статус ошибки:', error.response.status);
        console.error('Данные ошибки:', error.response.data);
      } else if (error.request) {
        console.error('Нет ответа от сервера');
      }
      throw error;
    }
  }
}
