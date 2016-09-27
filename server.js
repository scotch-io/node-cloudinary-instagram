// ./server.js
// Load dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://scotch:scotch@ds041546.mlab.com:41546/cloudinary-instagram');


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
