const { Sock } = require('../../db/models');

class SockService {
  static create(name, price, colorId, patternId, userId, designUrl) {
    // console.log(designUrl);
    return Sock.create({ name, price, colorId, patternId, userId, desingURL: designUrl });
  }
}

module.exports = SockService;
