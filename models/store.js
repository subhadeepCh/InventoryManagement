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
	console.log("CONNECTED TO DATABASE - store.js");
}).catch(err=>{
	console.log("Error : - store.js ",err.message);
});
*///==========================================
var storeSchema = new mongoose.Schema({
	itemName: String,
	quantity: Number,
	Price: Number,
	purchased : {
		type:Date,
		default: Date.now()
	},
	owner:{
		id:{type: mongoose.Schema.Types.ObjectId,
			ref : "User"},
		username: String
	}
});
module.exports = mongoose.model("Store",storeSchema);