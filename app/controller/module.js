const BaseController = require('./base');

class ModuleController extends BaseController {
  get table() {
    return "modules";
  }
}

module.exports = ModuleController;
