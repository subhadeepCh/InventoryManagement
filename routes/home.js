var express = require("express"),
	router     = express(),
	passport=require("passport"),
	User    =require("../models/user"),
	multer = require('multer');
//===========================================

var storage= multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter});
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'WRITE YOUR CLOUD NAME HERE', 
  api_key: 'API KEY PROVIDED BY YOUR ACCOUNT', 
  api_secret: 'FILL THIS FIELD TOO'
});

//=====================================
router.get("/",(req,res)=>{
	res.render("home");
});
//===============AUTH SIGNUP ROUTE=============
router.post("/register",upload.single('image'),(req,res)=>{
	cloudinary.uploader.upload(req.file.path, function(result) {
		req.body.image = result.secure_url;
		req.body.imageId=result.public_id;
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err)
			{
				cloudinary.v2.uploader.destroy(result.public_id, function(err1) {
				if(err1){
						console.log("ERROR IN DELETING THE DP "+err);
						}
				else{
					console.log("Uploaded image deleted "+req.body.imageId);
					console.log(err);
					req.flash("error",err.message);
					return res.redirect("home");
				}});
			
			}
		else
			{
				user.image= result.secure_url;
				user.imageId=result.public_id;
				user.save();
				passport.authenticate("local")(req,res,function(){
					console.log("Registered Successfully !! "+ user.username);
					req.flash("success","Registered Successfully !! 	Welcome "+user.username);
					res.redirect("/"+user._id+"/inventory");
				});
			}
	});
	});
});
//=====================================
//===========LOGIN ROUTE===================
router.post("/login",passport.authenticate("local",{
	failureRedirect: "/",
	failureFlash: 'Invalid username or password.'
}),(req,res)=>{
	console.log("Logged In Successfully !!")
	req.flash("success","Logged In Successfully !!");
		res.redirect("/"+req.user._id+"/inventory");	
});
router.get("/logout",(req,res)=>{
	req.logout();
	req.flash("success","Logged Out Successfully !!");
	res.redirect("/");
});
//===========================================
module.exports=router;