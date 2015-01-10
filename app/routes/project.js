// app/routes/project.js

// Helper libraries
var async     = require('async');

// Modals
var Project   = require('../models/project');
var Goal      = require('../models/goal');
var Milestone = require('../models/milestone');
var Note      = require('../models/note');
var Category  = require('../models/category');

module.exports = function(app) {
    //get all projects
    app.get('/api/projects', function(req, res) {
        Project.find(function(err, projects) {
            if (err) res.send(err); else res.json(projects);
        });
    });

    // get a single project
    app.get('/api/projects/:project_id', function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err) res.send(err); else res.json(project);
        });
    });

    // update a single project
    app.put('/api/projects/:project_id', function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err) {
                res.send(err);
            } else {
                project.name = req.body.name;
                project.description = req.body.description;

                project.save(function(err, project) {
                    if (err) res.send(err); else res.json({ success: project });
                });
            }
        });
    });

    // create a project
    app.post('/api/projects', function(req, res) {
        var project = new Project(req.body);

        project.save(function(err, project) {
            if (err) res.send(err); else res.json({success: project });
        });
    });

    // delete a project
    app.delete('/api/projects/:project_id', function(req, res) {
        async.parallel([function(callback) {
            Project.remove({
                _id: req.params.project_id
            }, function(err, project) {
                callback(err);
            });
        }, function(callback) {
            Goal.remove({
                projectId : req.params.project_id
            }, function(err, goal) {
                callback(err);
            });
        }, function(callback) {
            Milestone.remove({
                projectId : req.params.project_id
            }, function(err, milestone) {
                callback(err);
            });
        }, function(callback) {
            Note.remove({
                projectId : req.params.project_id
            }, function(err, milestone) {
                callback(err);
            });
        }, function(callback) {
            Category.remove({
                projectId : req.params.project_id
            }, function(err, milestone) {
                callback(err);
            });
        }], function(err) {
            if (err) res.send(err); else res.json({ success: 'Project Deleted' });
        });
    });
};