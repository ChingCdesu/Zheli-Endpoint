const Service = require('egg').Service;

// TODO: 表单格式验证
class BaseService extends Service {
  constructor(ctx) {
    super(ctx);
    for (var field in ctx.request.body) {
      if (ctx.request.body[field] === 'mysql.now') {
        ctx.request.body[field] = this.app.mysql.literals.now;
      }
    }
  }
  async create(table) {
    let retCode = 0;
    let message = 'Success';
    try {
      const result = await this.app.mysql.insert(table, this.ctx.request.body);
      if (result.rowsAffected !== 1) {
        retCode = 4000;
        message = '未知错误'
      }
    } catch (e) {
      retCode = e.errno;
      message = e.sqlMessage;
    }
    return { 'retCode': retCode, 'message': message, 'data': null };
  }

  async show(table) {
    let retCode = 0;
    let message = 'Success';
    let data = null;
    try {
      data = await this.app.mysql.get(table, { id: this.ctx.params.id });
      if (data === null) {
        retCode = 4001;
        message = '无法找到数据';
      }
    } catch (e) {
      retCode = e.errno;
      message = e.sqlMessage;
    }
    return { 'retCode': retCode, 'message': message, 'data': data };
  }

  async update(table) {
    let retCode = 0;
    let message = 'Success';
    let data = null;
    try {
      const result = await this.app.mysql.update(table, this.ctx.request.body);
      if (result.rowsAffected !== 1) {
        retCode = 4000;
        message = '未知错误'
      }
    } catch (e) {
      retCode = e.errno;
      message = e.sqlMessage;
    }
    return { 'retCode': retCode, 'message': message, 'data': data };
  }

  async destroy(table) {
    let retCode = 0;
    let message = 'Success';
    let data = null;
    try {
      const result = await this.app.mysql.update(table, this.ctx.params.id);
      if (result.rowsAffected !== 1) {
        retCode = 4000;
        message = '未知错误'
      }
    } catch (e) {
      retCode = e.errno;
      message = e.sqlMessage;
    }
    return { 'retCode': retCode, 'message': message, 'data': data };
  }

  async confirm(table) {
    let retCode = 0;
    let message = 'Success';
    let data = null;
    try {
      const result = await this.app.mysql.get(table, { id: this.ctx.params.id });
      const body = this.ctx.request.body;
      for (var field in body) {
        if (body[field] !== result[field])
          throw {errno: 4003, message: "验证失败"};
      }
    } catch (e) {
      retCode = e.errno;
      message = e.message;
    }
    return { 'retCode': retCode, 'message': message, 'data': data };
  }

}

module.exports = BaseService;
