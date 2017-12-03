var express = require("express");
var router = express.Router();
var Beach = require("../models/beach");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comments New        
router.get("/ttbeaches2/:id/comments/new", middleware.isLoggedIn, function(req, res){
        
        // Find Beach By It's ID
        
    Beach.findById(req.params.id, function(err, beach){
       if(err){
           console.log(err);
       } else{
           res.render("comments/new",{beach:beach});
       }
    });    
    
});

//Comments Create

router.post("/ttbeaches2/:id/comments", middleware.isLoggedIn, function(req, res){
        
        // Look Up Beaches Using ID
    
    Beach.findById(req.params.id, function(err, beach){
        if(err){
            console.log(err);
            res.redirect("/ttbeaches2");
        }  else {
            
            // Create A New Comment
            
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    
                     // Connect Comment To Specefic Beach
                     // Add Username And Id to Comment
                     
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    beach.comments.push(comment);
                    beach.save();
                    
                    // Redirect Back To The Show Page
                    
                    req.flash("success", "Successfully added comment!");
                    res.redirect('/ttbeaches2/'+ beach._id);
                    
                }
            });
        }
    });
    
});

// Comment Destroy Route

router.delete("/ttbeaches2/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else{
           req.flash("success", "Comment deleted");
           res.redirect("/ttbeaches2/" + req.params.id);
       }
    });
});


module.exports = router;