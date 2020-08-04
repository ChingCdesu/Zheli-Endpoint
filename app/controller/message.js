const BaseController = require('./base');

class MessageController extends BaseController {
  get table() {
    return "messages";
  }
}

module.exports = MessageController;
