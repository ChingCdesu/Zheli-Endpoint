const BaseController = require('./base');

class VideoCommentController extends BaseController {
  get table() {
    return "videoComments";
  }
}

module.exports = VideoCommentController;
