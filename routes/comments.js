var express = require('express');
var router = express.Router();
var Campground = require('../models/campgrounds.js');
var Comment = require('../models/comments.js');

var middlewareObj = require('../middleware');

router.get("/campground/:id/comments/new",middlewareObj.isLoggedIn,function(req, res) {
   
    Campground.findById(req.params.id,function(err,found)
   {
       if(err)
        console.log("Error!");
       else
        res.render("comments/new",{campground:found});
               
   });
    
});

router.post("/campground/:id/comments",middlewareObj.isLoggedIn,function(req,res)
{
     Campground.findById(req.params.id,function(err,found)
   {
       if(err)
        {console.log("Error!");
         res.redirect("/");
        }
       else
        {
            Comment.create(req.body.comment,function(err,newcomment)
            {
                if(err)
                    console.log("Error!");
                else
                {
                    newcomment.author.id = req.user._id;
                    newcomment.author.username = req.user.username;
                    
                    newcomment.save();
                    found.comments.push(newcomment);
                    found.save(function(err,data)
                {
                    if(err)
                        {console.log("Error!");
                        res.redirect("/");
                        }
                        else
                        {
                            req.flash("success","Comment Successfully Added ")
                         res.redirect("/campground/" + found._id);
                        }
                });
                    
                }
            });
            
            
        }
               
   });
});

router.get("/campground/:id/comments/:comment_id/edit",middlewareObj.checkCommentOwnership,function(req,res)
{
   Campground.findById(req.params.id,function(err, foundCampground) {
      if(err)
       console.log(err);
      else
       {
           Comment.findById(req.params.comment_id,function(err, foundComment) {
             if(err)
                 console.log(err);
             else 
                res.render("comments/edit",{comment:foundComment,campground:foundCampground}); 
    });
    
       }
   });
    
   
});

router.put("/campground/:id/comments/:comment_id",middlewareObj.checkCommentOwnership,function(req,res)
{
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updated){
         if(err)
       console.log(err);
       else
       {
           req.flash("success","Successfully edited.");
           res.redirect("/campground/" + req.params.id);
       }
    });
});


router.delete("/campground/:id/comments/:comment_id",middlewareObj.checkCommentOwnership,function(req,res)
{
    Comment.findByIdAndRemove(req.params.comment_id,function(err)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/campground/" + req.params.id);
        }
        else
        {
            req.flash("success","Successfully deleted.");
            res.redirect("/campground/" + req.params.id);
        }
    });
});



module.exports = router;