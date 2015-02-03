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
                page.project = project;
                if (project === null) {
                    callback({ "message" : "Project does not exist!" });
                } else {
                    callback(err);
                } 
            });
        }, function(callback) {
            // find all top-level goals associated with project
            // additionally, add a note count and subgoal count
            Goal.find({ projectId: req.params.project_id, parentId: null }, function(err, goals) {
                if (goals) {
                    async.forEach(goals, function(currentGoal, callback) {
                        var stats = {
                            numNotes: 0,
                            numSubgoals: 0,
                            numMilestones: 0
                        };

                        var goalCategory = null;

                        async.parallel([
                        function(callback) {
                            Note.count({ parentId: currentGoal._id }, function(err, count) {
                                stats.numNotes = count;
                                callback(err);
                            });
                        },
                        function(callback) {
                            Goal.count({ parentId: currentGoal._id }, function(err, count) {
                                stats.numSubgoals = count;
                                callback(err);
                            });
                        },
                        function(callback) {
                            Milestone.count({ parentId: currentGoal._id }, function(err, count) {
                                stats.numMilestones = count;
                                callback(err);
                            });
                        },
                        function(callback) {
                            if (currentGoal.categoryId) {
                                Category.find({ _id: currentGoal.categoryId }, 'name color', function(err, category) {
                                    goalCategory = category[0];
                                    callback(err);
                                });
                            } else {
                                callback();
                            }
                        }], function(err) {
                            page.subgoals.push({ 
                                'goal'     : currentGoal,
                                'stats'    : stats,
                                'category' : goalCategory
                            });
                            callback(err);
                        });
                    }, function(err) {
                        callback(err);
                    });
                } else {
                    callback(err);
                }
            });
        }, function(callback) {
            // find all top-level notes associated with this project
            Note.find({ projectId: req.params.project_id, parentId: null }, function(err, notes) {
                page.notes = notes;
                callback(err);
            });
        }, function(callback) {
            // find all top-level milestones associated with this project
            Milestone.find({ projectId: req.params.project_id, parentId: null }, function(err, milestones) {
                page.milestones = milestones;
                callback(err);
            });
        }, function(callback) {
            // find all categories associated with this project
            Category.find({ projectId: req.params.project_id }, function(err, categories) {
                page.categories = categories;
                callback(err);
            });
        }], function(err) {
            if (err) {
                res.json({ "error" : err });
            } else {
                res.json(page);
            }
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
                page.goal = goal;
                if (goal === null) { 
                    callback({ "message" : "Goal does not exist!" });
                } else {
                    callback(err);
                }
            });
        }, function(callback) {
            async.parallel([
            function(callback) {
                // get and set project
                Project.findById(page.goal.projectId, function(err, project) {
                    page.project = project;
                    callback(err);
                });
            }, function(callback) {
                // find all top-level goals associated with project
                // additionally, add a note count and subgoal count
                Goal.find({ parentId: req.params.goal_id }, function(err, goals) {
                    if (goals) {
                        async.forEach(goals, function(currentGoal, callback) {
                            var stats = {
                                numNotes: 0,
                                numSubgoals: 0,
                                numMilestones: 0
                            };

                            var goalCategory = null;

                            async.parallel([
                            function(callback) {
                                Note.count({ parentId: currentGoal._id }, function(err, count) {
                                    stats.numNotes = count;
                                    callback(err);
                                });
                            },
                            function(callback) {
                                Goal.count({ parentId: currentGoal._id }, function(err, count) {
                                    stats.numSubgoals = count;
                                    callback(err);
                                });
                            },
                            function(callback) {
                                Milestone.count({ parentId: currentGoal._id }, function(err, count) {
                                    stats.numMilestones = count;
                                    callback(err);
                                });
                            },
                            function(callback) {
                                if (currentGoal.categoryId) {
                                    Category.find({ _id: currentGoal.categoryId }, 'name color', function(err, category) {
                                        goalCategory = category[0];
                                        callback(err);
                                    });
                                } else {
                                    callback();
                                }
                            }], function(err) {
                                page.subgoals.push({ 
                                    'goal'     : currentGoal,
                                    'stats'    : stats,
                                    'category' : goalCategory
                                });
                                callback(err);
                            });
                        }, function(err) {
                            callback(err);
                        });
                    } else {
                        callback(err);
                    }
                });
            }, function(callback) {
                // find all top-level notes associated with this project
                Note.find({ parentId: req.params.goal_id }, function(err, notes) {
                    page.notes = notes;
                    callback(err);
                });
            }, function(callback) {
                // find all top-level milestones associated with this project
                Milestone.find({ parentId: req.params.goal_id }, function(err, milestones) {
                    page.milestones = milestones;
                    callback(err);
                });
            }, function(callback) {
                // find all categories associated with this project
                Category.find({ projectId: page.goal.projectId }, function(err, categories) {
                    page.categories = categories;
                    callback(err);
                });
            }, function(callback) {
                // find all breadcrumbs using breadcrumb builder
                breadCrumbBuilder(page.goal.parentId, function(bc) {
                    page.breadcrumbs = bc;
                    callback();
                });
            }], function(err) {
                callback(err);
            });
        }], function(err) {
            if (err) {
                res.json({ "error" : err });
            } else {
                res.json(page);
            }
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

