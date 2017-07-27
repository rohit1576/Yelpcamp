var mongoose = require('mongoose');
var Campground = require('./models/campgrounds.js');
var Comment = require('./models/comments.js');

var data = [
        {name:"Cloud's Rest",
        image:"https://farm5.staticflickr.com/4223/34057990733_d4e0aa10bd.jpg",
        description:"sdjbfjdsf"
    
        },
    
      {  name:"Another dog",
         image:"https://farm3.staticflickr.com/2948/33942699045_855c012e95.jpg",
         description:"dsfgsr"
          
      },
         
         {   name:"Another dog",
             image:"https://farm5.staticflickr.com/4159/34367460140_fa92d7c7e0.jpg",
             description:"dsfgsr"
             
         }
    ];

function seedDB(){
    
Campground.remove({},function(err)
{   //Remove all campgrounds
   if(err)
     console.log("Error!");
    /* else
    {
         for(var i=0;i<data.length;i++)
        {
       Campground.create(data[i],function(err,newcamp)
       {
           if(err)
            console.log("Error!");
            else
            {
                console.log("Added!");
                Comment.create({text:"sdfsf",author: "Rohit"},function(err,comment)
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        newcamp.comments.push(comment);
                        newcamp.save();
                        
                        
                    }
                });
            }
             
       });
       
       
       
        }
       
    }*/
});

  

}

module.exports = seedDB;