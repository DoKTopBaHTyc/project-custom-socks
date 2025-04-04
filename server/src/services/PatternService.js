const { Pattern } = require('../../db/models');

class PatternService {
  static getAllPatterns() {
    return Pattern.findAll();
  }

    static getByUrl(url) {
      return Pattern.findOne({
        where: {url}
      })
    }
}

module.exports = PatternService;
