// app/models/project.js
var mongoose = require('mongoose');

// project model
module.exports = mongoose.model('Project', {
    name : {type : String, required : true},
    description : {type : String, default : ''}
});