var express = require("express");
var router = express.Router();
var Beach = require("../models/beach");
var middleware = require("../middleware");
var geocoder = require('geocoder');

//   Display All Beaches On index.ejs
       
router.get("/ttbeaches2", function(req, res){
    Beach.find({}, function(err, allbeaches){
        if(err){
            console.log(err);
        } else {
            res.render("beaches/index", {beaches:allbeaches});
        }
    });   
    
});
       
       //   GET- Add A Beach Form Page
       
router.get("/ttbeaches2/new", middleware.isLoggedIn, function(req, res){
   res.render("beaches/new"); 
});

// Post Route For Add A New Beach Form        
router.post("/ttbeaches2", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user.id,
        username:req.user.username
    };
    var stars = req.body.stars;
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address
        var newBeaches = {name: name, image:image, stars:stars, description:desc, author:author, location: location, lat: lat, lng: lng};
    
       //   Transfer Previous Form Inputs Into Creation Of A New Beach On index.ejs
    
        Beach.create(newBeaches, function(err,newlyCreated){
            if(err){
                console.log(err);
            } else {
                res.redirect("/ttbeaches2");
            }
        });
    });
});

       //   Show Page - Shows Info On Selected Route
       
router.get("/ttbeaches2/:id", function(req, res){
    //Change ObjectId comments into readable script for user
    Beach.findById(req.params.id).populate("comments").exec(function(err, foundBeach){
        if(err || !foundBeach){
            req.flash("error","Beach not found");
            res.redirect("/ttbeaches2");
        } else {
            res.render("beaches/show", {beach:foundBeach});
        }
    });
});

// Edit Beach Route

router.get("/ttbeaches2/:id/edit", middleware.checkBeachOwnership, function(req, res){
         Beach.findById(req.params.id, function (err, foundBeach){
             if(err || !foundBeach){
                req.flash("error","Beach not found");
                res.redirect("/ttbeaches2");
             } else {
                 res.render("beaches/edit", {beach:foundBeach}); 
             }
                    
    }); 
   
});

// Find And Update Correct Beach

router.put("/ttbeaches2/:id", middleware.checkBeachOwnership, function(req, res){
    
    geocoder.geocode(req.body.beach.location, function (err, data) {   // Geocoder is for utilization of Google Maps API
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = {name: req.body.beach.name, image: req.body.beach.image, description: req.body.beach.description, stars: req.body.beach.stars, location: location, lat: lat, lng: lng};
        Beach.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedBeach){
            if(err){
                req.flash("error", err.message);
                res.redirect("/ttbeaches2");
            } else {
                req.flash("success","Successfully Updated!");
                res.redirect("/ttbeaches2/" + req.params.id); 
            }
        });    
    });    
});

// Destroy Beach Route

router.delete("/ttbeaches2/:id", middleware.checkBeachOwnership, function(req, res){
    Beach.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/ttbeaches2");
        } else{
            res.redirect("/ttbeaches2");
        }
    });
});





module.exports = router;