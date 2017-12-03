let Beach = require("../models/beach");
let Comment = require("../models/comment");
let middlewareObj = {};

//Functions To Check For User Authorization

middlewareObj.checkBeachOwnership = function(req, res, next){
    if(req.isAuthenticated()){
         Beach.findById(req.params.id, function (err, foundBeach){
            if(err || !foundBeach){
               req.flash("error", "Beach not found"); 
               res.redirect("back");
            } else{ // Does User Own Beach?
                if(foundBeach.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
         });    
    } else {
       req.flash("error","You need to be logged in to do that");    
       res.redirect("back");
    }
    
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
         Comment.findById(req.params.comment_id, function (err, foundComment){
            if(err){
               res.redirect("back");
            } else{ // Does User Own Comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
         });    
    } else {
        req.flash("error", "You need to be logged in to do that");
       res.redirect("back");
    }

};

// Function for User Authentication

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;