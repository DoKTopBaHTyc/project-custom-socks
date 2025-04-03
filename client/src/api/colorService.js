import axiosInstance from './axiosInstance';

export default class ColorService {
  static async getAllColors() {
    try {
      const response = await axiosInstance('/gensock/colors');
      if (response.status !== 200) throw new Error('Неверный статус (ожидался 200)');
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении цветов:', error.message);
      if (error.response) {
        console.error('Статус ошибки:', error.response.status);
        console.error('Данные ошибки:', error.response.data);
      } else if (error.request) {
        console.error('Нет ответа от сервера');
      }
      throw error;
    }
  }

  // static async getOneColor(colorId) {
  //   try {
  //     const response = await axiosInstance(`/gensock/colors/${String(colorId)}`);
  //     if (response.status !== 200) throw new Error('Неверный статус (ожидался 200)');
  //     return response.data;
  //   } catch (error) {
  //     console.error('Ошибка при получении цветов:', error.message);
  //     if (error.response) {
  //       console.error('Статус ошибки:', error.response.status);
  //       console.error('Данные ошибки:', error.response.data);
  //     } else if (error.request) {
  //       console.error('Нет ответа от сервера');
  //     }
  //     throw error;
  //   }
  // }
}
