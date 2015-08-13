var db = require('../models');
var express = require('express')
var router = express.Router();
var request = require('request');

router.get("/search", function(req, res) {
  var searchTerm = req.query.q;
  var url = 'http://www.omdbapi.com/?s='+searchTerm;
  if(searchTerm.length > 3){
    request(url, function(error, response, data){
      if(JSON.parse(data).Response === "False"){
        res.send("try a new search term")
      } else {
      var dataArr = JSON.parse(data).Search;
      res.render("main/search", {results: dataArr});
      }
    });
  } else { res.send("please enter a longer term") }
});

router.get("/show/:id", function(req,res){
  showTerm = req.params.id
  var url = 'http://www.omdbapi.com/?i='+showTerm+'&plot=full&r=json&tomatoes=true';
  request(url, function(error, response, data){
    var data = JSON.parse(data)
    db.favorite.find({where:{imdbId:showTerm}, include:[db.tag]}).then(function(movie){
      if(!movie){
        res.render("main/show", {data: data, id:showTerm, favorite:movie});
      }else{
        db.comment.findAll({where:{favoriteId:movie.id}}).then(function(show){
        res.render("main/show", {data: data, id:showTerm, favorite:movie, showComments:show});
        })
      }
    })
  });
});

router.get("/tags", function(req,res){
  db.tag.findAll({include: db.favorite}).then(function(tags){
  res.render("tags/index", {tags:tags})
  })
});

router.get("/tags/add", function(req,res){
  db.tag.findAll().then(function(tags){
  res.render("tags/add", {tags:tags})
  })
});

router.post("/tags/add/post", function(req,res){
  db.tag.findOrCreate({where:{name:req.body.tag}}).spread(function(tags, created){
  res.render("tags/add", {tags:tags})
  }).catch(function(error){
    res.render("shared/404", {error:error.message})
  });
});

module.exports = router;

