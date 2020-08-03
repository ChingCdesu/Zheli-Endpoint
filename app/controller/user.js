const BaseController = require('./base');

class UserController extends BaseController {
    get table() {
        return "users";
    }

    async confirm() {
        this.ctx.body = await this.ctx.service.base.confirm(this.table);
    }
}

module.exports = UserController;
