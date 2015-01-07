var mongoose = require('mongoose');

// note model
module.exports = mongoose.model('Note', {
    name : { type : String, required : true },
    description : {type : String, default: ''},
    dateAdded : { type: Date },
    parentId : { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
    projectId : { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
});