// ./routes.js
var controller = require('./app/controller');

module.exports = function (app) {
    app.get('/', controller.index);
};