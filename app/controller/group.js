const BaseController = require('./base');

class GroupController extends BaseController {
  get table() {
    return "groups";
  }
}

module.exports = GroupController;
