var mongoose = require('mongoose');

// category model
module.exports = mongoose.model('Category', {
    name : { type : String, required : true },
    description : {type : String, default: ''},
    color : String,
    projectId : { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
});