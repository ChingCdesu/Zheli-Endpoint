const BaseController = require('./base');

class GroupUserController extends BaseController {
  get table() {
    return "groupUsers";
  }
}

module.exports = GroupUserController;
