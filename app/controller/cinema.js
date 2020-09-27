const BaseController = require('./base');

class CinemaController extends BaseController {
  get table() {
    return "cinema";
  }
}

module.exports = CinemaController;
