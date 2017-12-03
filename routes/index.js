var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
   res.render("landing"); // Get landing page
});

        //  ================
        //  AUTH ROUTES
        //  ===============

// Show Register Form

router.get("/register", function(req, res){
    res.render("register");
});

//Handle Sign Up Logic

router.post("/register", function(req, res){
    let newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        } 
        
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Beach Quest " + user.username);
            res.redirect("/ttbeaches2");
        });
    });
});

// Show Login Form

router.get("/login", function(req, res){
    res.render("login");
});

// Handling Login Logic

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/ttbeaches2",
        failureRedirect: "/login"
    }), function(req, res){
        
});

// Logout Route

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You Are Logged Out!")
    res.redirect("/ttbeaches2");
});


module.exports = router;