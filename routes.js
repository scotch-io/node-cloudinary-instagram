// ./routes.js
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var controller = require('./app/controller');

module.exports = function (app) {
    app.get('/', controller.index);
    app.get('/new', controller.new);
    app.post('/create', multipartMiddleware, controller.create);
};