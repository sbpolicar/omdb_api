var db = require('../models');
var express = require('express');
var router = express.Router();

router.get("/:id/comments", function(req,res){
  db.favorite.findAll({where:{imdbId:req.params.id}}).then(function(favorites){
    db.comment.findAll({where:{favoriteId:favorites[0].id.toString()}}).then(function(show){
      res.render('comments/index', {favorites:favorites, show:show});
    });
  });
});

router.post("/:id/comments/post", function(req,res){
  db.comment.create({
    body:req.body.comment,
    favoriteId:req.body.id
  }).then(function(){
    res.redirect('/favorites/'+req.body.imdbId+'/comments')
  });
  // res.redirect('/favorites')
});

module.exports = router;