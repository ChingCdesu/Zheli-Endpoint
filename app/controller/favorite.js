const BaseController = require('./base');

class FavoriteController extends BaseController {
    get table() {
        return "favorite";
    }
}

module.exports = FavoriteController;
