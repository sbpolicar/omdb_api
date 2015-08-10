var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');

require('express-helpers')(app);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);

app.get("/", function(req, res) {
    res.render("main/index")
});

app.get("/search", function(req, res) {
  var searchTerm = req.query.q;
  var url = 'http://www.omdbapi.com/?s='+searchTerm;
  request(url, function(error, response, data){
    var dataArr = JSON.parse(data).Search;
    res.render("main/search", {results: dataArr});
  });
});

app.get("/show/:id", function(req,res){
  showTerm = req.params.id
  var url = 'http://www.omdbapi.com/?i='+showTerm+'&plot=full&r=json&tomatoes=true';
  request(url, function(error, response, data){
    var data = JSON.parse(data)
    res.render("main/show", {data: data});
  });

});

// SEARCH FUNCTION FROM DAILY PLANET LAB \\
// app.get("/search", function(req,res){
//   var searchTerm = req.query.q
//   var displayArray = [];
//   for (var i = 0; i < articles.length; i++) {
//     if(articles[i].title.indexOf(searchTerm) !== -1){
//       displayArray.push(articles[i])
//     }
//   };
//   res.render('main/search.ejs', {searchVal: displayArray });
// });


// SNYTAX FOR REQUEST REFERENCE \\
// router.get("/new", function(req, res) {
// <<<<<<< HEAD
//   var url = 'http://pokeapi.co/api/v1/pokemon/'+Math.floor(Math.random()*300);
//   // res.render('pokemon/new.ejs');
//   request(url, function(error, response, data){
//   var parsedData = JSON.parse(data)
//   var pokedexId = parsedData.national_id;
//   var name = parsedData.name;
//   var type = parsedData.types;
//   var abilities = parsedData.abilities
//   var level = parsedData.exp;
//   var species = parsedData.species;

//   var newPokemon = new Pokemon(pokedexId, name, type, abilities, level, species)
//   pokemon.push(newPokemon)

//   res.redirect("/pokemon")


//     // res.send(data);
//     // pokemon.push(new Pokemon(name, ));
//   });



app.listen(3000);
