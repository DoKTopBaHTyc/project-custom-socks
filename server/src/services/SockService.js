const { Sock } = require('../../db/models');

class SockService {
  static create(name, price, colorId, patternId, userId, designUrl) {
    return Sock.create({ name, price, colorId, patternId, userId, designUrl });
  }
}

module.exports = SockService;
