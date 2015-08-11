var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var request = require('request');
var app = express();

require('express-helpers')(app);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);
app.use('/favorites', require('./controllers/favorites.js'))
app.use('/favorites/', require('./controllers/comments.js'))
app.use('/', require('./controllers/movies.js'))

app.get("/", function(req, res) {
    res.render("main/index")
});

app.listen(3000);
