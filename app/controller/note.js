const BaseController = require('./base');

class NoteController extends BaseController {
  get table() {
    return "notes";
  }
}

module.exports = NoteController;
