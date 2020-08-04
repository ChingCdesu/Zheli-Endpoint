const BaseController = require('./base');

class PostController extends BaseController {
  get table() {
    return "posts";
  }
}

module.exports = PostController;
