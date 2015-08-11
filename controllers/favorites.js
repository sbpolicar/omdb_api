var db = require('../models');
var express = require('express')
var router = express.Router();

router.post("/", function(req,res){
  db.favorite.create({
    imdbId: req.body.id,
    title:req.body.title,
    year:req.body.year,
    poster:req.body.poster
  }).then(function(){
    res.redirect('show/'+req.body.id)
  });
});

router.delete("/:id", function(req,res){
  db.favorite.destroy({where:{imdbId:req.params.id}}).then(function(){
    res.redirect('/favorites');
  })
})

router.get("/", function(req,res){
  db.favorite.findAll().then(function(favorites){
  res.render('favorites/index', {favoritesList:favorites});
  })
});

module.exports = router;