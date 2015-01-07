// app/routes/goal.js

var Goal      = require('../models/goal');
var Milestone = require('../models/milestone');
var Note      = require('../models/note');

module.exports = function(app) {
    //get all goals
    app.get('/api/goals', function(req, res) {
        Goal.find(function(err, goals) {
            if (err) res.send(err);

            res.json(goals);
        });
    });

    //get all goals for a project
    app.get('/api/goals/by-project/:project_id', function(req, res) {
        Goal.find({ projectId : req.params.project_id }, function(err, goals) {
            if (err) res.send(err);

            res.json(goals);
        });
    });

    //get all top-level goals for a project
    app.get('/api/goals/by-project/:project_id/top', function(req, res) {
        Goal.find({ projectId : req.params.project_id, parentId : null }, function(err, goals) {
            if (err) res.send(err);

            res.json(goals);
        });
    });

    //get all child goals for a parent
    app.get('/api/goals/by-parent/:parent_id', function(req, res) {
        Goal.find({ parentId : req.params.parent_id }, function(err, goals) {
            if (err) res.send(err);

            res.json(goals);
        });
    });

    // get a single goal
    app.get('/api/goals/:goal_id', function(req, res) {
        Goal.findById(req.params.goal_id, function(err, goal) {
            if (err) res.send(err);

            res.json(goal);
        });
    });

    // update a single goal
    app.put('/api/goals/:goal_id', function(req, res) {
        Goal.findById(req.params.goal_id, function(err, goal) {
            if (err) res.send(err);

            goal.name = req.body.name;
            goal.description = req.body.description;
            goal.beginDate = req.body.beginDate;
            goal.endDate = req.body.endDate;
            goal.percentComplete = req.body.percentComplete;
            goal.categoryId = req.body.categoryId;
            goal.parentId = req.body.parentId;
            goal.projectId = req.body.projectId;

            goal.save(function(err, goal) {
                if (err) res.send(err);

                res.json({ success: goal });
            });
        });
    });

    // create a goal
    app.post('/api/goals', function(req, res) {
        if (req.body.parentId == "") {
            delete req.body.parentId;
        }

        if (req.body.categoryId == "") {
            delete req.body.categoryId;
        }

        var goal = new Goal(req.body);

        goal.save(function(err, goal) {
            if (err) res.send(err);

            res.json({ success: goal });
        });
    });

    // delete a goal
    app.delete('/api/goals/:goal_id', function(req, res) {
        Goal.remove({
            _id: req.params.goal_id
        }, function(err, goal) {
            if (err) res.send(err);
        });

        Goal.remove({
            parentId: req.params.goal_id
        }, function(err, goal) {
            if (err) res.send(err);
        });

        Milestone.remove({
            parentId: req.params.goal_id
        }, function(err, goal) {
            if (err) res.send(err);
        });

        Note.remove({
            parentId: req.params.goal_id
        }, function(err, goal) {
            if (err) res.send(err);
        });

        res.json({ success: 'Goal Deleted' });
    });
};