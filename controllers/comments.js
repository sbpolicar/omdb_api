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

router.get("/:id/tags", function(req,res){
  db.favorite.findAll({where:{imdbId:req.params.id}, include:[db.tag]}).then(function(favorite){
    var tags = favorite[0].tags;
    var title = favorite[0].title;
    res.render("tags/new", {tags:tags, title:title})
  })
});

router.post("/:id/tags/post", function(req,res){
  db.favorite.find({where: {imdbId:req.params.id}}).then(function(favorite){
    db.tag.findOrCreate({where:{name:req.body.tag}}).spread(function(tag, created){
      favorite.addTag(tag).then(function(){
        res.redirect("/favorites/"+req.params.id+"/tags");
      });
    });
  });
});

module.exports = router;






