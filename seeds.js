var mongoose = require("mongoose");
var Beach    = require("./models/beach");
var Comment = require("./models/comment");

var data = [
    {
        name: "Pigeon Point", 
        image: "https://c1.staticflickr.com/9/8245/8650236044_6a9f88cd48_b.jpg", 
        stars: 5,
        description:"Pigeon Point beach is considered by many as Tobago's most beautiful beach and is considered the signature beach of Tobago."
    },
    {
        name: "Macqueripe Bay",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Macqueripe_Bay%2C_Chaguaramas%2C_Trinidad.jpg",
        stars: 4,
        description: "Very good beach for swimming and doing snorkeling. Calm and peaceful during most seasons."
    
    },
    {
        name: "Maracas Bay",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Maracas_Bay_-_Trinidad%2C_West_Indies.jpg",
        stars: 3,
        description: "Most popular beach in Trinidad, good place to swim and hang out with friends or family. Can be crowded and is not as tranquil as other beaches."
    
    }
]

function seedDB(){
    // Remove all beaches
    Beach.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
           console.log("removed beaches"); 
        }
            // add beaches
        data.forEach(function(seed){
            Beach.create(seed, function(err, beach){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a beach");
                    // create a comment
                    Comment.create(
                        {
                            text:"This place is wonderful, but I'm not sure about the people.",
                            author: "Leeroy"
                        }, function (err, comment){
                            if (err){
                                console.log(err);
                            } else {
                                beach.comments.push(comment);
                                beach.save();
                                console.log("Created a comment");
                            }
                           }    
                    )
                }
            }); 
        });
    });
    
}

module.exports= seedDB;