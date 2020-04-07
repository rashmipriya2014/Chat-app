var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chatApp'
,{ useNewUrlParser: true ,useUnifiedTopology: true }).then(()=>console.log("DB server connect"))
.catch(e => console.log("DB error", e));


var db = mongoose.connection;

// User Schema
var UserSchema = mongoose.Schema({
	name: {
		type: String,
        index: true
    },
	email: {
		type: String
	},
	username: {
		type: String
	},
	password: {
		type: String
	},
	gender: {
		type: String
	},
	avatar:{
		type:String
	}
});

module.exports = mongoose.model('User', UserSchema);

