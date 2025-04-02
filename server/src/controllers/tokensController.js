const cookieConfig = require('../configs/cookieConfig');
const tokensService = require('../services/tokensService');

const tokensController = {
  async refresh(req, res) {
    try {
      const { user, accessToken, refreshToken } = await tokensService.refresh(
        res.locals.user,
      );
      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user, accessToken });
    } catch (error) {
      if (error.message === 'Пользователь не авторизован') {
        return res.status(401).json({ error: error.message });
      }
      console.log(error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  },
};

module.exports = tokensController;
