const BaseController = require('./base');

class PostLikeController extends BaseController {
  get table() {
    return "postLikes";
  }
}

module.exports = PostLikeController;
