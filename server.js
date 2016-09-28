// ./server.js
// Load dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan       = require('morgan');

var app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://127.0.0.1:27017/scotchgram');


app.set('port', 4000 || process.env.PORT);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes
require('./routes')(app);

var port = app.get('port');
app.listen(port, function () {
    console.log('App running at ' + port);
});
