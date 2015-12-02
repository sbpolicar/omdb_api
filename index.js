var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var request = require('request');
var methodOverride = require('method-override');
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var flash = require('connect-flash');
var app = express();


// require('express-helpers')(app);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);
app.use(session({
  secret:"o12i3qwreaq3roj4t5haw4",
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(function(req,res,next){

  if(req.session.user){
    db.user.findById(req.session.user).then(function(user){
      req.currentUser = user;
      next();
    })
  }else{
    req.currentUser = false;
    next();
  }
})

app.use(function(req,res,next){
  res.locals.currentUser = req.currentUser;
  res.locals.alerts = req.flash();
  next();
})

app.use('/favorites', require('./controllers/favorites.js'))
app.use('/', require('./controllers/movies.js'))
app.use('/auth',require('./controllers/auth.js'));


app.get("/", function(req, res) {
    res.render("main/index")
});

app.listen(process.env.PORT || 3000);
