var mongoose = require("mongoose");

//Schema Setup, Beach Card Template
var beachesSchema = new mongoose.Schema({
    name: String,
    image: String,
    stars: Number,
    description: String,
    location:String,
    lat:Number,
    lng:Number,
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    
    comments: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }    
    ]
});

module.exports = mongoose.model("Beach", beachesSchema);

