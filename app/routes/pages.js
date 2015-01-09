// app/routes/pages.js

// Helper includes
var async     = require('async');

// Models
var Project   = require('../models/project');
var Goal      = require('../models/goal');
var Milestone = require('../models/milestone');
var Note      = require('../models/note');
var Category  = require('../models/category');

module.exports = function(app) {

    //get all data for main project page
    app.get('/api/pages/project/:project_id', function(req, res) {
        var page = {
            project: null,
            subgoals: [],
            notes: [],
            milestones: [],
            categories: []
        };

        async.parallel([
        function(callback) {
            // get and set project
            Project.findById(req.params.project_id, function(err, project) {
                if (err) callback(err);
                page.project = project;
                callback();
            });
        }, function(callback) {
            // find all top-level goals associated with project
            // additionally, add a note count and subgoal count
            Goal.find({ projectId: req.params.project_id, parentId: null }, function(err, goals) {
                if (err) callback(err);

                async.forEach(goals, function(currentGoal, callback) {
                    var stats = {
                        numNotes: 0,
                        numSubgoals: 0
                    };

                    async.parallel([
                    function(callback) {
                        Note.count({ parentId: currentGoal._id }, function(err, count) {
                            if (err) callback(err);
                            stats.numNotes = count;
                            callback();
                        });
                    },
                    function(callback) {
                        Goal.count({ parentId: currentGoal._id }, function(err, count) {
                            if (err) callback(err);
                            stats.numSubgoals = count;
                            callback();
                        });
                    }], function(err) {
                        if (err) callback(err);
                        page.subgoals.push({ 
                            'goal' : currentGoal,
                            'stats': stats
                        });
                        callback();
                    });
                }, function(err) {
                    if (err) callback(err);
                    callback();
                });
            });
        }, function(callback) {
            // find all top-level notes associated with this project
            Note.find({ projectId: req.params.project_id, parentId: null }, function(err, notes) {
                if (err) callback(err);
                page.notes = notes;
                callback();
            });
        }, function(callback) {
            // find all top-level milestones associated with this project
            Milestone.find({ projectId: req.params.project_id, parentId: null }, function(err, milestones) {
                if (err) callback(err);
                page.milestones = milestones;
                callback();
            });
        }, function(callback) {
            // find all categories associated with this project
            Category.find({ projectId: req.params.project_id }, function(err, categories) {
                if (err) callback(err);
                page.categories = categories;
                callback();
            });
        }], function(err) {
            if (err) res.send(err);
            res.json(page);
        });
    });


    //get all data for a specific goal page
    app.get('/api/pages/goal/:goal_id', function(req, res) {
        var page = {
            goal: null,
            project: null,
            subgoals: [],
            notes: [],
            milestones: [],
            categories: [],
            breadcrumbs: []
        };

        async.series([
        function(callback) {
            // get and set current goal
            Goal.findById(req.params.goal_id, function(err, goal) {
                if (err) callback(err);
                page.goal = goal;
                callback();
            });
        }, function(callback) {
            async.parallel([
            function(callback) {
                // get and set project
                Project.findById(page.goal.projectId, function(err, project) {
                    if (err) callback(err);
                    page.project = project;
                    callback();
                });
            }, function(callback) {
                // find all top-level goals associated with project
                // additionally, add a note count and subgoal count
                Goal.find({ parentId: req.params.goal_id }, function(err, goals) {
                    if (err) callback(err);

                    async.forEach(goals, function(currentGoal, callback) {
                        var stats = {
                            numNotes: 0,
                            numSubgoals: 0
                        };

                        async.parallel([
                        function(callback) {
                            Note.count({ parentId: currentGoal._id }, function(err, count) {
                                if (err) callback(err);
                                stats.numNotes = count;
                                callback();
                            });
                        },
                        function(callback) {
                            Goal.count({ parentId: currentGoal._id }, function(err, count) {
                                if (err) callback(err);
                                stats.numSubgoals = count;
                                callback();
                            });
                        }], function(err) {
                            if (err) callback(err);
                            page.subgoals.push({ 
                                'goal' : currentGoal,
                                'stats': stats
                            });
                            callback();
                        });
                    }, function(err) {
                        if (err) callback(err);
                        callback();
                    });
                });
            }, function(callback) {
                // find all top-level notes associated with this project
                Note.find({ parentId: req.params.goal_id }, function(err, notes) {
                    if (err) callback(err);
                    page.notes = notes;
                    callback();
                });
            }, function(callback) {
                // find all top-level milestones associated with this project
                Milestone.find({ parentId: req.params.goal_id }, function(err, milestones) {
                    if (err) callback(err);
                    page.milestones = milestones;
                    callback();
                });
            }, function(callback) {
                // find all categories associated with this project
                Category.find({ projectId: page.goal.projectId }, function(err, categories) {
                    if (err) callback(err);
                    page.categories = categories;
                    callback();
                });
            }, function(callback) {
                // find all breadcrumbs using breadcrumb builder
                breadCrumbBuilder(page.goal.parentId, function(bc) {
                    page.breadcrumbs = bc;
                    callback();
                });
            }], function(err) {
                if (err) callback(err);
                callback();
            });
        }], function(err) {
            if (err) res.send(err);
            res.json(page);
        });
    });

    // takes an id and callback function
    // and uses the callback to return json with the
    // breadcrumbs associated with the goal
    // excluding the project and the initial goal
    function breadCrumbBuilder(id, callback) {
        var breadcrumbs = [];

        var q = async.queue(function(g, callback) {
            if (g._id != null) {
                Goal.findById(g._id, function(err, goal) {
                    breadcrumbs.push({
                             '_id' : goal._id,
                             'name' : goal.name,
                             'order' : g.order + 1
                            });

                    q.push({ _id : goal.parentId, order : g.order + 1 });                  
                    callback();
                });
            } else {
                callback();
            }
        }, 5);

        q.drain = function() {
            callback(breadcrumbs);
        }

        q.push({ _id : id, order : 0 });
    }
};

