var mongoose = require('mongoose');

// user model
module.exports = mongoose.model('User', {
    username : { type : String, required : true },
    password : { type : String, required : true },
    email : { type : String, required : true }
});