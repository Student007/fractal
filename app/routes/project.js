// app/routes/project.js

var Project   = require('../models/project');
var Goal      = require('../models/goal');
var Milestone = require('../models/milestone');

module.exports = function(app) {
    //get all projects
    app.get('/api/projects', function(req, res) {
        Project.find(function(err, projects) {
            if (err) res.send(err);

            res.json(projects);
        });
    });

    // get a single project
    app.get('/api/projects/:project_id', function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err) res.send(err);

            res.json(project);
        });
    });

    // update a single project
    app.put('/api/projects/:project_id', function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err) res.send(err);

            project.name = req.body.name;
            project.description = req.body.description;

            project.save(function(err) {
                if (err) res.send(err);

                res.json({ success: 'Project Updated'});
            });
        });
    });

    // create a project
    app.post('/api/projects', function(req, res) {
        var project = new Project(req.body);

        project.save(function(err) {
            if (err) res.send(err);

            res.json({success: 'Project Created'});
        });
    });

    // delete a project
    app.delete('/api/projects/:project_id', function(req, res) {
        Project.remove({
            _id: req.params.project_id
        }, function(err, project) {
            if (err) res.send(err);
        });

        Goal.remove({
            projectId : req.params.project_id
        }, function(err, goal) {
            if (err) res.send(err);
        });

        Milestone.remove({
            projectId : req.params.project_id
        }, function(err, milestone) {
            if (err) res.send(err);
        });

        res.json({ success: 'Project Deleted' });
    });
};