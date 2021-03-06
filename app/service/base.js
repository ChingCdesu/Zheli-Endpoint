const Service = require('egg').Service;
const codes = require('../utils/code_message');

class BaseService extends Service {
  constructor(ctx) {
    super(ctx);
    for (const field in ctx.request.body) {
      if (ctx.request.body[field] === 'mysql.now') {
        ctx.request.body[field] = this.app.mysql.literals.now;
      }
    }
    delete ctx.request.body.endpoint;
    delete ctx.request.query.endpoint;

    for (const bodyKey in ctx.request.body) {
      if (ctx.request.body[bodyKey] === undefined || ctx.request.body[bodyKey] === null || ctx.request.body[bodyKey] === "")
        delete ctx.request.body[bodyKey];
    }
    for (const queryKey in ctx.request.query) {
      if (ctx.request.query[queryKey] === undefined || ctx.request.query[queryKey] === null || ctx.request.query[queryKey] === "")
        delete ctx.request.query[queryKey];
    }
  }

  // confirm
  async index(table) {
    let retCode = 0;
    let message = 'Success';
    let data = null;
    try {
      const result = await this.app.mysql.select(table, {
        where: this.ctx.request.query,
        columns: ['ID'],
      });
      console.log(this.ctx.request.query);
      if (result.length !== 0) {
        data = {
          count: result.length,
          values: result
        };
      } else {
        retCode = 21;
        message = codes[21];
      }
    } catch (e) {
      retCode = e.code || e.errno || 90;
      message = e.sqlMessage || e.message || codes[retCode] || codes[90];
    }
    return { 'retCode': retCode, 'message': message, 'data': data };
  }

  async create(table) {
    let retCode = 0;
    let message = 'Success';
    let data = null;
    try {
      const rule = await this._getFieldsRule(table);
      this.ctx.validate(rule);
      const result = await this.app.mysql.insert(table, this.ctx.request.body);
      if (result.affectedRows !== 1) {
        retCode = 90;
        message = codes[90];
      } else {
        data = { id: result.insertId };
      }
    } catch (e) {
      retCode = e.code || e.errno || 90;
      message = e.sqlMessage || e.message || codes[retCode] || codes[90];
    }
    return { 'retCode': retCode, 'message': message, 'data': data };
  }

  async show(table) {
    let retCode = 0;
    let message = 'Success';
    let data = null;
    try {
      data = await this.app.mysql.get(table, { id: this.ctx.params.id });
      if (data === null) {
        retCode = 10;
        message = codes[10];
      }
    } catch (e) {
      retCode = e.code || e.errno || 90;
      message = e.sqlMessage || e.message || codes[retCode] || codes[90];
    }
    return { 'retCode': retCode, 'message': message, 'data': data };
  }

  async update(table) {
    let retCode = 0;
    let message = 'Success';
    let data = null;
    try {
      const result = await this.app.mysql.update(table, this.ctx.request.body);
      if (result.affectedRows !== 1) {
        retCode = 90;
        message = codes[90];
      }
    } catch (e) {
      retCode = e.code || e.errno || 90;
      message = e.sqlMessage || e.message || codes[retCode] || codes[90];
    }
    return { 'retCode': retCode, 'message': message, 'data': data };
  }

  async destroy(table) {
    let retCode = 0;
    let message = 'Success';
    let data = null;
    try {
      const result = await this.app.mysql.delete(table, this.ctx.params.id);
      if (result.affectedRows !== 1) {
        retCode = 90;
        message = codes[90];
      }
    } catch (e) {
      retCode = e.code || e.errno || 90;
      message = e.sqlMessage || e.message || codes[retCode] || codes[90];
    }
    return { 'retCode': retCode, 'message': message, 'data': data };
  }

  async _getFieldsRule(table) {
    const fields = await this.app.mysql.select('information_schema.COLUMNS', {
      where: { table_name: table, table_schema: this.app.config.mysql.client.database },
      columns: ['COLUMN_NAME', 'IS_NULLABLE', 'COLUMN_DEFAULT', 'DATA_TYPE', 'EXTRA'],
    });

    let ret = {};
    fields.forEach(value => {
      ret[value['COLUMN_NAME']] = {
        type: value['DATA_TYPE'].toLowerCase().replace(new RegExp(/^(varchar)|(datetime)$/), 'string'),
        required: value['IS_NULLABLE'] !== 'YES' &&
          value['COLUMN_DEFAULT'] === null &&
          value['EXTRA'] !== 'auto_increment',
      }
    });
    return ret;
  }
}

module.exports = BaseService;
