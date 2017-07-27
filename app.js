var express = require('express');
var Comment = require('./models/comments.js');
var passport = require('passport'),
flash        = require('connect-flash'),
localstrategy = require('passport-local'),
User = require('./models/user.js');

var app = express();
var bodyparser = require("body-parser");

var mongoose = require('mongoose');
var Campground = require('./models/campgrounds.js');
var methodoverride = require('method-override');

app.use(methodoverride("_method"));
app.use(flash());

app.use(express.static("public"));

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret:"Anything",
    resave:false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());   

app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   res.locals.error     =  req.flash("error");
   res.locals.success   =  req.flash("success");
   next();
});

var seedDB = require('./seeds');
//seedDB(); seed the database




mongoose.connect("mongodb://localhost/yelp_camp",{ useMongoClient: true});



app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");

var commentRoutes    = require('./routes/comments.js'),
    campgroundRoutes = require('./routes/campgrounds.js'),
    indexRoutes      = require('./routes/index.js');
    
    
app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);


app.get("*",function(req,res)
{
    res.send("404 NOT FOUND!");
});

app.listen(process.env.PORT,process.env.IP,function()
{
    console.log("Server has started!!");
});