var mongoose = require("mongoose"),
	passportLocalMongoose=require("passport-local-mongoose");
//==========================================
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
	console.log("CONNECTED TO DATABASE - user.js");
}).catch(err=>{
	console.log("Error : - user.js ",err.message);
});
*///==========================================

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	image:String,
	imageId:String,
	Inventory: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref : "Store"
		}
	],
	Order:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref : "Order"
		}
	]
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);