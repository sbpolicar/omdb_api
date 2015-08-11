var db = require('../models');
var express = require('express')
var router = express.Router();
var request = require('request');

router.get("/search", function(req, res) {
  var searchTerm = req.query.q;
  var url = 'http://www.omdbapi.com/?s='+searchTerm;
  request(url, function(error, response, data){
    var dataArr = JSON.parse(data).Search;
    res.render("main/search", {results: dataArr});
  });
});

router.get("/show/:id", function(req,res){
  showTerm = req.params.id
  var url = 'http://www.omdbapi.com/?i='+showTerm+'&plot=full&r=json&tomatoes=true';
  request(url, function(error, response, data){
    var data = JSON.parse(data)
    db.favorite.find({where:{imdbId:showTerm}}).then(function(movie){
      if(!movie){
        res.render("main/show", {data: data, id:showTerm, favorite:movie});
      }else{
        db.comment.findAll({where:{favoriteId:movie.id}}).then(function(show){
        res.render("main/show", {data: data, id:showTerm, favorite:movie, showComments:show});
        })
      }
    })
    // if(db.favorite.findAll({where:{imdbId:req.params.id}})===true){
    // db.favorite.findAll({where:{imdbId:req.params.id}}).then(function(movie){
    //   db.comment.findAll({where:{favoriteId:movie[0].id.toString()}}).then(function(show){
    //   res.render("main/show", {data: data, id:showTerm, showComments:show});
    //   });
    // });
    // }else{
    //   res.render("main/show", {data: data, id:showTerm});
    // }
  });
});

module.exports = router;

