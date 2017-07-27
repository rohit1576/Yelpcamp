var Comment = require('../models/comments.js'),
Campground  =require('../models/campgrounds.js');
var middlewareObj={};

middlewareObj.checkCommentOwnership = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id,function(err, found) {
           if(err)
            {
                console.log(err);
                req.flash("error",err.message);
            }
           else
           {
               if(found.author.id.equals(req.user._id))
                next();
               else
               {
                   req.flash("error","You are not authenticated to do this!");
                   res.redirect("back");
               }
           }
            
        });
        
    }
    else
    {
        req.flash("error","You need to login");
        res.redirect("back");
    }
};
middlewareObj.checkCampgroundOwnership = function(req,res,next)
{
     if(req.isAuthenticated())
   {
       
       Campground.findById(req.params.id,function(err,found)
       {
           if(err)
            {   
                console.log(err);
                req.flash("error",err.message);
            }
        else
         {
             if(found.author.id.equals(req.user._id))
               next();
             else
             {
                 req.flash("error","You are not authenticated to do this!");
                 res.redirect("back");
             }
         }
            
       });
    }
    else
    {
        req.flash("error","You need to login");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        
        return next();
    }
    req.flash("error","please login first");
    res.redirect("/login");
};



module.exports = middlewareObj;