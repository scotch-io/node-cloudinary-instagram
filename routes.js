// ./routes.js
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var controller = require('./app/controller');

module.exports = function (app) {
    app.get('/', controller.index);

    app.get('/new', controller.new);
    app.post('/create', multipartMiddleware, controller.create);

    app.get('/edit/:id', controller.edit);
    app.post('/update', controller.update);

    app.post('/destroy', controller.destroy);

    app.get('/account/:id', controller.find);


    /*
    * Admin Routes
    *
    * */
    app.get('/admin', controller.admin.index);
};
