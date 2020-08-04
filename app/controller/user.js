const BaseController = require('./base');

class UserController extends BaseController {
    get table() {
        return "users";
    }

    // async confirm() {
    //     let retCode = 0;
    //     let message = 'Success';
    //     let data = null;
    //     try {
    //         const result = await this.app.mysql.get(table, { id: this.ctx.params.id });
    //         const body = this.ctx.request.body;
    //         for (var field in body) {
    //             if (body[field] !== result[field])
    //                 throw { errno: 21, message: codes[21] };
    //         }
    //     } catch (e) {
    //         retCode = e.errno;
    //         message = e.message;
    //     }
    //     this.ctx.body = { 'retCode': retCode, 'message': message, 'data': data };
    // }
}

module.exports = UserController;
