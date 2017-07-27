var express = require('express');
var router = express.Router();

var passport = require('passport'),
User = require('../models/user.js');
router.get("/",function(req,res)
{
    res.render("landing");
});

//AUTH ROUTES

router.get("/register",function(req, res) {
    res.render("register");
});

router.post("/register",function(req, res) {
   var newuser = new User({username:req.body.username});
   
   User.register(newuser,req.body.password,function(err,user)
   {
       if(err)
        {
              return res.render("register", {"error": err.message});
        }
       else
       {
           passport.authenticate("local")(req,res,function()
           {
               req.flash("success","Nice to meet you " + user.username);
              res.redirect("/campground") ;
           });
       }
        
   });
});

//LOGIN
router.get("/login",function(req, res) {
   res.render("login"); 
});

router.post("/login",passport.authenticate("local",
{
    successRedirect:"/campground",
    failureRedirect: "/login"
}),function(req,res)
{
    
});

//LOGOUT
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","You have logged out.");
    res.redirect("/campground");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;