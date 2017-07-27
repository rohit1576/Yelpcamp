var express = require('express');
var router = express.Router();
var Campground = require('../models/campgrounds.js');
var middlewareObj = require('../middleware');



//EDIT ROUTE

router.get("/campground/:id/edit",middlewareObj.checkCampgroundOwnership,function(req, res) {
   
       Campground.findById(req.params.id,function(err,found)
               {
                   if(err)
                    console.log(err);
                     else
                 {
                    res.render("campgrounds/edit",{campground:found}); 
                     
                 }
                    
               });
   
   
});

router.put("/campground/:id",middlewareObj.checkCampgroundOwnership,function(req,res)
{
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updated){
       if(err)
       console.log(err);
       else
       {
           req.flash("success","Successfully edited.");
           res.redirect("/campground/" + req.params.id);
       }
   });
});


router.get("/campground",function(req,res)
{
    Campground.find({},function(err,campgrounds)
    {
        if(err)
         console.log("Error!");
        else
         {
            // console.log(campgrounds);
             res.render("campgrounds/campground",{arr:campgrounds,currentUser:req.user});
         }
    });
});

router.post("/campground",middlewareObj.isLoggedIn,function(req,res){
    
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var newauthor = {
        id : req.user._id,
        username : req.user.username
        
    };
    
   
    Campground.create(
    {
        name: name,
        image: image,
        price: price,
        description: desc,
        author: newauthor
        
    },function(err,campground)
    {
        if(err)
        console.log("err!!!");
        else
        {  
            console.log("campground added!");
            req.flash("success","Successfully added new Campground.");
             res.redirect("/campground");
        }
    });
    
});

router.get("/campground/new",middlewareObj.isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});


router.get("/campground/:id",function(req,res)
{
    
    Campground.findById(req.params.id).populate("comments").exec(function(err,found){
        if(err)
         console.log(err);
        else
        {   //console.log(found);
            res.render("campgrounds/show",{campground:found});
        }
    });
   
   
});


router.delete("/campground/:id",middlewareObj.checkCampgroundOwnership,function(req,res)
{
    Campground.findByIdAndRemove(req.params.id,function(err)
    {
        if(err)
        {
            res.redirect("/campground");
        }
        else
        {
            req.flash("success","Successfully deleted.");
            res.redirect("/campground");
        }
    });
});





module.exports = router;