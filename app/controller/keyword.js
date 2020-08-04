const BaseController = require('./base');

class KeywordController extends BaseController {
  get table() {
    return "keywords";
  }
}

module.exports = KeywordController;
