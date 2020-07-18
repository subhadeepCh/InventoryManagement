var mongoose = require("mongoose");
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
	console.log("CONNECTED TO DATABASE - order.js");
}).catch(err=>{
	console.log("Error : - order.js ",err.message);
});
*///==========================================
var orderSchema = new mongoose.Schema({
	itemName: String,
	quantity: Number,
	status: String,
	owner:{
		id:{type: mongoose.Schema.Types.ObjectId,
			ref : "User"},
		username: String
	}
});
module.exports = mongoose.model("Order",orderSchema);