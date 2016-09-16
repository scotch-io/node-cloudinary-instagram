// ./server.js
// Load dependencies
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('port', 4000 || process.env.PORT);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json())

// Routes
require('./routes')(app);

var port = app.get('port');
app.listen(port, function () {
    console.log('App running at ' + port);
});