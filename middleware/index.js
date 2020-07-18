var User   = require("../models/user");
middleob={};
middleob.isLoggedIn=function isLoggedIn(req,res,next)
{
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please login first");
	res.redirect("/");
};


module.exports=middleob;