const BaseController = require('./base');

class UserController extends BaseController {
    get table() {
        return "users";
    }
}

module.exports = UserController;
