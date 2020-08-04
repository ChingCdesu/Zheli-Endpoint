const BaseController = require('./base');

class RoleController extends BaseController {
  get table() {
    return "roles";
  }
}

module.exports = RoleController;
