const { Pattern } = require('../../db/models');

class PatternService {
  static getAllPatterns() {
    return Pattern.findAll();
  }
}

module.exports = PatternService;
