// app/routes/goal.js

// Helper libraries
var async     = require('async');

// Models
var Goal      = require('../models/goal');
var Milestone = require('../models/milestone');
var Note      = require('../models/note');

module.exports = function(app) {
    //get all goals
    app.get('/api/goals', function(req, res) {
        Goal.find(function(err, goals) {
            if (err) res.send(err); else res.json(goals);
        });
    });

    //get all goals for a project
    app.get('/api/goals/by-project/:project_id', function(req, res) {
        Goal.find({ projectId : req.params.project_id }, function(err, goals) {
            if (err) res.send(err); else res.json(goals);
        });
    });

    //get all top-level goals for a project
    app.get('/api/goals/by-project/:project_id/top', function(req, res) {
        Goal.find({ projectId : req.params.project_id, parentId : null }, function(err, goals) {
            if (err) res.send(err); else res.json(goals);
        });
    });

    //get all child goals for a parent
    app.get('/api/goals/by-parent/:parent_id', function(req, res) {
        Goal.find({ parentId : req.params.parent_id }, function(err, goals) {
            if (err) res.send(err); else res.json(goals);
        });
    });

    // get a single goal
    app.get('/api/goals/:goal_id', function(req, res) {
        Goal.findById(req.params.goal_id, function(err, goal) {
            if (err) res.send(err); else res.json(goal);
        });
    });

    // update a single goal
    app.put('/api/goals/:goal_id', function(req, res) {
        Goal.findById(req.params.goal_id, function(err, goal) {
            if (err) {
                res.send(err); 
            } else { 
                goal.name = req.body.name;
                goal.description = req.body.description;
                goal.beginDate = req.body.beginDate;
                goal.endDate = req.body.endDate;
                goal.percentComplete = req.body.percentComplete;
                goal.categoryId = req.body.categoryId;
                goal.parentId = req.body.parentId;
                goal.projectId = req.body.projectId;

                goal.save(function(err, goal) {
                    if (err) res.send(err); else res.json({ success: goal });
                });
            }
        });
    });

    // create a goal
    app.post('/api/goals', function(req, res) {
        var goal = new Goal(req.body);

        goal.save(function(err, goal) {
            if (err) res.send(err); else res.json({ success: goal });
        });
    });

    // delete a goal
    app.delete('/api/goals/:goal_id', function(req, res) {
        // delete all associated subgoals, milestones, and notes recursively
        // return err if error, null otherwise 
        var recursiveChildDelete = function(id) {
            async.series([ function(callback) {
                Goal.find({ parentId: id }, function(err, children) {
                    if (children) {
                        async.forEach(children, function(child, callback) {
                            var err = recursiveChildDelete(child._id);
                            callback(err);
                        }, function(err) {
                            callback(err);
                        });
                    } else {
                        callback(err);
                    }
                });
            }, function(callback) {
                async.parallel([ function(callback) {
                    Goal.remove({ parentId : id }, function(err, goal) {
                        callback(err);
                    });
                }, function(callback) {
                    Milestone.remove({ parentId : id }, function(err, milestone) {
                        callback(err);
                    });
                }, function(callback) {
                    Note.remove({ parentId : id }, function(err, note) {
                        callback(err);
                    });
                }], function(err) {
                    callback(err);
                });
            }], function(err) {
                if (err) return err; else return null;
            });
        };

        // delete top level goal and its directly related elements
        async.parallel([ function(callback) {
            Goal.remove({
                _id: req.params.goal_id
            }, function(err, goal) {
                callback(err);
            });
        }, function(callback) {
            var err = recursiveChildDelete(req.params.goal_id);
            callback(err);
        }, function(callback) {
            Milestone.remove({
                parentId: req.params.goal_id
            }, function(err, goal) {
                callback(err);
            });
        }, function(callback) {
            Note.remove({
                parentId: req.params.goal_id
            }, function(err, goal) {
                callback(err);
            });
        }], function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ success: 'Goal Deleted' });
            }
        });
    });
};