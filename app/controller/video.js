const BaseController = require('./base');

class VideoController extends BaseController {
  get table() {
    return "videos";
  }
}

module.exports = VideoController;
