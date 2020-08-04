const Service = require('egg').Service;
const sha256 = require("js-sha256");

class TokenService extends Service {
  async get(uid) {
    try {
        const user = await this.app.mysql.get('users', { id: uid });
        return user['Token'];
    } catch (e) {
      return null;
    }
  }

  async generate(uid) {
    let token = null;
    try {
      var hash = sha256.create();
      hash.update(Date.now().toLocaleString() + Math.random().toFixed(5));
      token = hash.hex().substring(0, 128);
      const row = {
        id: uid,
        token: token,
      };
      this.app.mysql.update('users', row);
    } catch (e) {
      this.ctx.logger.error(e);
    }
    return token;
  }
}

module.exports = TokenService;
