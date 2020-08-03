const Controller = require('egg').Controller;

class BaseController extends Controller {
    async create() {
        this.ctx.body = await this.ctx.service.base.create(this.table);
    }

    async show() {
        this.ctx.body = await this.ctx.service.base.show(this.table);
    }

    async update() {
        this.ctx.body = await this.ctx.service.base.update(this.table);
    }

    async destroy() {
        this.ctx.body = await this.ctx.service.base.destroy(this.table);
    }
}

module.exports = BaseController;
