var mongoose = require('mongoose');

// goal model
module.exports = mongoose.model('Goal', {
    name : { type : String, required : true },
    description : {type : String, default: ''},
    beginDate : Date,
    endDate : Date,
    color : String,
    percentComplete : Number,
    parentId : { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
    projectId : { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
});