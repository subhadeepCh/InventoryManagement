var express = require("express"),
	router     = express(),
	User   = require("../models/user"),
	Store = require("../models/store"),
	Order = require("../models/order");

router.get("/admin@subhadeep99341",(req,res)=>{
	User.find({},(err,user)=>{
		if(err){
		console.log(err);
			res.redirect("back");
		}
		else{
	res.render("admin",{user:user});	
		}
	});
});
module.exports=router;