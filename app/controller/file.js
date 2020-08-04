const Controller = require('egg').Controller;

class FileController extends Controller {
  async upload() {
    this.ctx.body = await this.ctx.service.file.upload(this.ctx.params.type);
  }
}

module.exports = FileController;
