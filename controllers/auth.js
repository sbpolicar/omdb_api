var db = require('../models');
var express = require('express');
var router = express.Router();

router.get('/login',function(req,res){

    res.render('auth/login');
});

router.post('/login',function(req,res){
    db.user.authenticate(req.body.email, req.body.password, function(err,user){
      if(err){
        res.send(err);
      }else if(user){
        req.session.user = user.id;
        req.flash('success','You are logged in.')
        res.redirect("/")
      }else{
        req.flash('danger','invalid username or password');
        res.redirect('/auth/login')
      }
    });
});

router.get('/signup',function(req,res){
    res.render('auth/signup');
});

router.post('/signup',function(req,res){
  if(req.body.password != req.body.password2){
      req.flash('warning','Passwords must match!')
      res.redirect('/auth/signup')
  } else {
    db.user.findOrCreate({
      where:{
        email:req.body.email
      },
      defaults:{
        email:req.body.email,
        password:req.body.password,
        name:req.body.name
      }
    }).spread(function(user, created){
      if(created){
        req.flash('success',"You are signed up, please login.")
        res.redirect("/")
      }else{
        req.flash('warning',"A user with that email address already exists.")
        res.redirect('/auth/signup')
      }
    }).catch (function(err){
      if(err.message){
      req.flash('danger',err.message)
      res.redirect('/auth/signup')
      } else {
        console.log(err)
        req.flash('danger','unkown error.')
        res.redirect('/auth/signup')
      }
    });
  }
});

router.get('/logout',function(req,res){
  req.flash('danger','You have logged out')
  req.session.user = false;
  res.redirect('/');
});

module.exports = router;



