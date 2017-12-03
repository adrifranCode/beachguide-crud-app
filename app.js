var express        = require("express"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    app            = express(),
    bodyParser     = require("body-parser"),
    path           = require('path'),
    passport       = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy  = require("passport-local"),
    Beach          = require("./models/beach"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds");

       // Requiring Routes

var commentRoutes = require("./routes/comments"),
    beachRoutes   = require("./routes/beaches"),
    indexRoutes   = require("./routes/index");
    
       //   Setup/Configuration for Mongoose and application
       
mongoose.connect("mongodb://localhost/beach_guide", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride("_method"));
app.use(flash());
mongoose.Promise = global.Promise;
//seedDB(); // Seed database with predetermind beach data for index.ejs

       //  ======================
       //  PASSPORT CONFIGURATION
       //  ======================
       
app.use(require("express-session")({
    secret: "Authentication for Beach Quest Trinidad And Tobago",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
       
app.use(indexRoutes);
app.use(beachRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Beach guide server has started");
});