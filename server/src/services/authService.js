const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');

class AuthService {
  static async signUp(email, name, password) {
    if (!email || !name || !password) {
      throw new Error('Отсутствуют обязательные поля');
    }

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        password: await bcrypt.hash(password, 10),
      },
    });

    if (!created) {
      throw new Error('Пользователь уже существует');
    }

    const plainUser = user.get();
    delete plainUser.password;

    const tokens = generateTokens({ user: plainUser });
    return { user: plainUser, ...tokens };
  }

  static async logIn(email, password) {
    if (!email || !password) {
      throw new Error('Отсутствуют обязательные поля');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Не верный логин или пароль');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Не верный логин или пароль');
    }

    const plainUser = user.get();
    delete plainUser.password;

    const tokens = generateTokens({ user: plainUser });
    return { user: plainUser, ...tokens };
  }

  static async logOut() {
    return true;
  }
}

module.exports = AuthService;
