const jwtConfig = {
  access: {
    expiresIn: `${5 * 60 * 1000}`, // 5 min
  },
  refresh: {
    expiresIn: `${1000 * 60 * 60 * 12}`, // 12 часов
  },
};

module.exports = jwtConfig;
