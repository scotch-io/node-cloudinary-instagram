// ./app/controller.js
var cloudinary = require('cloudinary');
var Model = require('./model');

cloudinary.config({
    cloud_name: 'christekh',
    api_key: '538641294753298',
    api_secret: 'y98Y8ZnsXQfEkba2LfQ0oV7zW_c'
});

module.exports = {
  index: function (req, res) {
      res.render('pages/index');
  },
  new: function (req, res) {
      res.render('pages/new');
  },
  create: function (req, res) {
      cloudinary.uploader.upload(req.files.image.path, function(result) {
          var post = new Model({
              title: req.body.title,
              description: req.body.description,
              created_at: new Date(),
              image: result.url
          });

          post.save(function (err) {
              if(err){
                  res.send(err)
              }
              res.redirect('/');
          });
      });
  }
};