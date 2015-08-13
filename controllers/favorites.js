var db = require('../models');
var express = require('express')
var router = express.Router();

router.post("/", function(req,res){
  db.favorite.findOrCreate({where:{
      imdbId: req.body.id,
      title:req.body.title,
      year:req.body.year,
      poster:req.body.poster
    }}).spread(function(x, created){
    res.redirect('show/'+req.body.id)
  });
});

router.delete("/:id", function(req,res){
  db.favorite.destroy({where:{imdbId:req.params.id}}).then(function(){
    res.redirect('/favorites');
  })
})

router.get("/", function(req,res){
  if(req.query.q){db.tag.find({where:{name:req.query.q}, include: db.favorite}).then(function(tag){
      res.render('favorites/index', {favoritesList:tag.favorites});
  })
  }else{
    db.favorite.findAll().then(function(favorites){
      res.render('favorites/index', {favoritesList:favorites});
    })
  }
});

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
  }).catch(function(error){
    res.render("shared/404", {error:error.message})
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
    }).catch(function(error){
    res.render("shared/404", {error:error.message})
    });
  });
});






module.exports = router;








