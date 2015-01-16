// app/routes/milestone.js

var Milestone = require('../models/milestone');

module.exports = function(app) {
    //get all milestones
    app.get('/api/milestones', function(req, res) {
        Milestone.find(function(err, milestones) {
            if (err) res.send(err); else res.json(milestones);
        });
    });

    //get all milestones for a project
    app.get('/api/milestones/by-project/:project_id', function(req, res) {
        Milestone.find({ projectId : req.params.project_id }, function(err, milestones) {
            if (err) res.send(err); else res.json(milestones);
        });
    });

    //get all top-level milestones for a project
    app.get('/api/milestones/by-project/:project_id/top', function(req, res) {
        Milestone.find({ projectId : req.params.project_id, parentId : null }, function(err, milestones) {
            if (err) res.send(err); else res.json(milestones);
        });
    });

    //get all child milestones for a parent goal
    app.get('/api/milestones/by-parent/:parent_id', function(req, res) {
        Milestone.find({ parentId : req.params.parent_id }, function(err, milestones) {
            if (err) res.send(err); else res.json(milestones);
        });
    });

    // get a single milestone
    app.get('/api/milestones/:milestone_id', function(req, res) {
        Milestone.findById(req.params.milestone_id, function(err, milestone) {
            if (err) res.send(err); else res.json(milestone);
        });
    });

    // update a single milestone
    app.put('/api/milestones/:milestone_id', function(req, res) {
        Milestone.findById(req.params.milestone_id, function(err, milestone) {
            if (err) {
                res.send(err);
            } else {
                milestone.name = req.body.name;
                milestone.description = req.body.description;
                milestone.date = req.body.date;
                milestone.color = req.body.color;
                milestone.percentComplete = req.body.percentComplete;
                milestone.categoryId = req.body.categoryId;
                milestone.parentId = req.body.parentId;
                milestone.projectId = req.body.projectId;

                milestone.save(function(err, milestone) {
                    if (err) res.send(err); else res.json({ success: milestone });
                });
            }
        });
    });

    // create a milestone
    app.post('/api/milestones', function(req, res) {
        var milestone = new Milestone(req.body);

        milestone.save(function(err, milestone) {
            if (err) res.send(err); else res.json({ success: milestone });
        });
    });

    // delete a milestone
    app.delete('/api/milestones/:milestone_id', function(req, res) {
        Milestone.remove({
            _id: req.params.milestone_id
        }, function(err, milestone) {
            if (err) res.send(err); else res.json({ success: 'Milestone Deleted' });
        })
    });
};