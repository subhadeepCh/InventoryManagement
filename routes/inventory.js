var express = require("express"),
	router     = express(),
	User   = require("../models/user"),
	Store = require("../models/store"),
	Order = require("../models/order"),
	middleware = require("../middleware");

//=====================================
router.get("/:id/inventory",middleware.isLoggedIn,(req,res)=>{
	User.findById(req.params.id,(err,user)=>{
		if(err){
		console.log(err);
			res.redirect("back");
		}
		else{
			Store.find({},(err,store)=>{res.render("inventory",{user:user,store:store});});
	
		}
	});
	
});
//====================================
router.get("/:id/store",middleware.isLoggedIn,(req,res)=>{
	User.findById(req.params.id,(err,user)=>{
		if(err){
		console.log(err);
			res.redirect("back");
		}
		else{
			Store.find({},(err,store)=>{res.render("store",{user:user,store:store});});
		
		}
	});
});
router.post("/:id/store",middleware.isLoggedIn,(req,res)=>{
	User.findById(req.params.id,(err,user)=>{
		if(err){
		console.log(err);
			res.redirect("back");
		}
		else{
			Store.create(req.body.store,(err,item)=>{
				if(err){
					console.log("CANNOT CREATE INVENTORY// inventory.js")
					req.flash("error","err.message");
					res.redirect("back");
				}
				else{
					item.owner.id=req.params.id;
					item.owner.username=user.username;
					item.save();
					console.log(item);
					user.Inventory.push(item);
					user.save();
					req.flash("success","Added Successfully");
					res.redirect("/"+req.params.id+"/store");
				}
			});	
		}
	});
});
router.put("/:id/store/:id1",middleware.isLoggedIn,(req,res)=>{
	Store.findByIdAndUpdate(req.params.id1,req.body.store,(err,item)=>{
		if(err){
			req.flash("error",err.message);
			res.redirect("back;")
		}
		else{
			console.log("Updated : "+item);
					   req.flash("success","Updated Successfully");
						res.redirect("/"+req.params.id+"/store");
		}
	});
});
router.delete("/:id/store/:id1",middleware.isLoggedIn,(req,res)=>{
	Store.findByIdAndRemove(req.params.id1,(err,item)=>{
		if(err){
			req.flash("error",err.message);
			res.redirect("back");
		}
		else{
			User.findById(req.params.id,(err,cuser)=>{
				if(err){
					req.flash("error",err.message);
					res.redirect("back");
				}
				else{
					for(var i=0;i<cuser.Inventory.length;i++){
						if(JSON.stringify(cuser.Inventory[i])===JSON.stringify(req.params.id1)){
							cuser.Inventory.splice(i,1);
						}
					}
					cuser.save();
					console.log("Deleted : "+item);
					   req.flash("success","Removed Successfully");
						res.redirect("/"+req.params.id+"/store");
				}
			});
			
		}
	});
});
//=====================================
router.get("/:id/order",middleware.isLoggedIn,(req,res)=>{
	User.findById(req.params.id,(err,user)=>{
		if(err){
		console.log(err);
			res.redirect("back");
		}
		else{
			Order.find({},(err,order)=>{res.render("order",{user:user,order:order});});	
		}
	});
});
router.post("/:id/order",middleware.isLoggedIn,(req,res)=>{
	User.findById(req.params.id,(err,user)=>{
		if(err){
		console.log(err);
			res.redirect("back");
		}
		else{
			Order.create(req.body.store,(err,item)=>{
				if(err){
					console.log("CANNOT CREATE INVENTORY// inventory.js")
					req.flash("error","err.message");
					res.redirect("back");
				}
				else{
					item.owner.id=req.params.id;
					item.owner.username=user.username;
					item.save();
					console.log(item);
					user.Order.push(item);
					user.save();
					console.log("ORDER ADDED : "+item);
					req.flash("success","Added Successfully");
					res.redirect("/"+req.params.id+"/store");
				}
			});	
		}
	});
});
router.put("/:id/order/:id1",middleware.isLoggedIn,(req,res)=>{
	Order.findByIdAndUpdate(req.params.id1,req.body.store,(err,item)=>{
		if(err){
			req.flash("error",err.message);
			res.redirect("back;")
		}
		else{
			console.log("Updated : "+item);
					   req.flash("success","Updated Successfully");
						res.redirect("/"+req.params.id+"/order");
		}
	});
});
router.delete("/:id/order/:id1",middleware.isLoggedIn,(req,res)=>{
	Order.findByIdAndRemove(req.params.id1,(err,item)=>{
		if(err){
			req.flash("error",err.message);
			res.redirect("back");
		}
		else{
			User.findById(req.params.id,(err,cuser)=>{
				if(err){
					req.flash("error",err.message);
					res.redirect("back");
				}
				else{
					for(var i=0;i<cuser.Inventory.length;i++){
						if(JSON.stringify(cuser.Order[i])===JSON.stringify(req.params.id1)){
							cuser.Order.splice(i,1);
						}
					}
					cuser.save();
					console.log("Deleted : "+item);
					   req.flash("success","Removed Successfully");
						res.redirect("/"+req.params.id+"/order");
				}
			});
			
		}
	});
});
//=====================================
router.get("/:id/Profile",middleware.isLoggedIn,(req,res)=>{
	User.findById(req.params.id,(err,user)=>{
		if(err){
		console.log(err);
			res.redirect("back");
		}
		else{
			Store.find({},(err,store)=>{res.render("profile",{user:user,store:store});});
		}
	});
});
//=====================================
router.get("/:id/stats",middleware.isLoggedIn,(req,res)=>{req.flash("error","WORK ON PROGRESS ");res.redirect("back");});
//=====================================
module.exports=router;