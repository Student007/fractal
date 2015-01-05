var mongoose = require('mongoose');

// milestone model
module.exports = mongoose.model('Milestone', {
    name : { type : String, required : true },
    date : Date,
    color : String,
    percentComplete : Number,
    parentId : { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
    projectId : { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
});