const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = user;
    return next();
  } catch (error) {
    console.log('Invalid access token', error);
    return res.sendStatus(403);
  }
};

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;
    return next();
  } catch (error) {
    console.log('Invalid refresh token', error);
    return res
      .clearCookie('refreshToken')
      .status(401)
      .json({ message: 'Invalid refresh token' });
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };
