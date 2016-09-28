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
      Model.find({}, function (err, posts) {
          if(err) res.send(err);

          res.render('pages/index', {posts: posts});
      });
  },
  find: function (req, res) {
      var id = req.params.id;
      Model.findOne({image_id: id}, function (err, post) {
          if (err) res.send(err);

          res.render('pages/single', {post: post, image: cloudinary.image, image_url: cloudinary.url});
      })
  },
  new: function (req, res) {
      res.render('pages/new');
  },
  edit: function (req, res) {
      Model.find({image_id: req.params.id}, function (err, posts) {
          if(err) res.send(err);

          res.render('pages/edit', {post: posts[0]});
      }); 
  },
  create: function (req, res) {
      cloudinary.v2.uploader.upload(req.files.image.path,
          { width: 300, height: 300, crop: "limit", tags: req.body.tags, moderation:'manual' },
          function(err, result) {
              console.log(result);
              var post = new Model({
                  title: req.body.title,
                  description: req.body.description,
                  created_at: new Date(),
                  image: result.url,
                  image_id: result.public_id
              });

              post.save(function (err) {
                  if(err){
                      res.send(err)
                  }
                  res.redirect('/');
              });
      });
  },
  update: function (req, res) {
      var oldName = req.body.old_id
      var newName = req.body.image_id;
      cloudinary.v2.uploader.rename(oldName, newName,
          function(error, result) {
              if (error) res.send(error);
              Model.findOneAndUpdate({image_id: oldName},
                  Object.assign({}, req.body, {image: result.url}),
                  function (err) {
                  if (err) res.send(err);

                  res.redirect('/');
              })
          })

  },
  destroy: function (req, res) {
      var imageId = req.body.image_id;
      cloudinary.v2.uploader.destroy(imageId, function (error, result) {
              Model.findOneAndRemove({ image_id: imageId }, function(err) {
                  if (err) res.send(err);

                  res.redirect('/');
              });
          });
  },

    admin:{
        index: function (req, res) {
            var q = req.query.q;
            var callback = function(result){
                var searchValue = '';
                if(q){
                    searchValue = q;
                }
                res.render('admin/index', {posts: result.resources, searchValue: searchValue});
            };
            if(q){
                cloudinary.api.resources(callback,
                    { type: 'upload', prefix: q });
            } else {
                cloudinary.api.resources(callback);
            }
        }
    }
};
