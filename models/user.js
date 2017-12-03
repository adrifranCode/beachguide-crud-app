var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// Creation of user login model

var UserSchema = new mongoose.Schema({
    username:String,
    password:String
});

//Authentication methods setup for mongoose

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);