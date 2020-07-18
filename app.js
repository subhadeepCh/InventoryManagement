var express = require("express"),
	app     = express(),
	mongoose=require("mongoose"),
	passport=require("passport"),
	LocalStrategy=require("passport-local"),
	passportLocalMongoose=require("passport-local-mongoose"),
	flash=require("connect-flash"),
	methodOverride=require("method-override"),	
	bodyParser= require("body-parser"),
	User=require("./models/user"),
	Store=require("./models/store"),
	Order=require("./models/order"),
	homeRouter= require("./routes/home"),
	adminRouter=require("./routes/admin"),
	inventRouter=require("./routes/inventory");
//=======================================
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//===========DATABASE CONNECTIVITY=========
mongoose.connect("mongodb://localhost/InventoryM",{
	useNewUrlParser : true,
	useCreateIndex  : true,
	useUnifiedTopology:true
}).then(()=>{
	console.log("CONNECTED TO DATABASE - order.js");
}).catch(err=>{
	console.log("Error : - order.js ",err.message);
});
/*=========================================
mongoose.connect("mongodb://localhost/InventoryM",{
	useNewUrlParser : true,
	useCreateIndex  : true,
	useUnifiedTopology:true
}).then(()=>{
	console.log("CONNECTED TO DATABASE - app.js");
}).catch(err=>{
	console.log("Error - app.js :",err.message);
});
*///=======================================
//=========PASSPORT CONFIG FOR USER AUTH===================
app.use(require("express-session")({
	secret:"This message is used to encode and decode",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=========================================================
app.use(function(req,res,next){
	res.locals.currentuser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});     
//=========================================================
app.use("/",homeRouter);
app.use("/",inventRouter);
app.use("/",adminRouter);
app.get("*",(req,res)=>{
	res.render("home");
});
//========================================
app.listen(3000,()=>{
	console.log("SERVER STARTED");
});