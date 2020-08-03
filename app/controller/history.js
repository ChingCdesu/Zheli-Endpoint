const BaseController = require('./base');

class HistoryController extends BaseController {
    get table() {
        return "histories";
    }
}

module.exports = HistoryController;
