// app/routes/note.js

var Note = require('../models/note');

module.exports = function(app) {
    //get all notes
    app.get('/api/notes', function(req, res) {
        Note.find(function(err, notes) {
            if (err) res.send(err); else res.json(notes);
        });
    });

    //get all notes for a project
    app.get('/api/notes/by-project/:project_id', function(req, res) {
        Note.find({ projectId : req.params.project_id }, function(err, notes) {
            if (err) res.send(err); else res.json(notes);
        });
    });

    //get all top-level notes for a project
    app.get('/api/notes/by-project/:project_id/top', function(req, res) {
        Note.find({ projectId : req.params.project_id, parentId : null }, function(err, notes) {
            if (err) res.send(err); else res.json(notes);
        });
    });

    //get all child notes for a parent goal
    app.get('/api/notes/by-parent/:parent_id', function(req, res) {
        Note.find({ parentId : req.params.parent_id }, function(err, notes) {
            if (err) res.send(err); else res.json(notes);
        });
    });

    // get a single note
    app.get('/api/notes/:note_id', function(req, res) {
        Note.findById(req.params.note_id, function(err, note) {
            if (err) res.send(err); else res.json(note);
        });
    });

    // update a single note
    app.put('/api/notes/:note_id', function(req, res) {
        Note.findById(req.params.note_id, function(err, note) {
            if (err) {
                res.send(err);
            } else {
                note.name = req.body.name;
                note.description = req.body.description;
                note.dateAdded = req.body.dateAdded;
                note.parentId = req.body.parentId;
                note.projectId = req.body.projectId;

                note.save(function(err, note) {
                    if (err) res.send(err); else res.json({ success: note });
                });
            }
        });
    });

    // create a note
    app.post('/api/notes', function(req, res) {
        var note = new Note(req.body);

        note.save(function(err, note) {
            if (err) res.send(err); else res.json({ success: note });
        });
    });

    // delete a note
    app.delete('/api/notes/:note_id', function(req, res) {
        Note.remove({
            _id: req.params.note_id
        }, function(err, note) {
            if (err) res.send(err); else res.json({ success: 'Note Deleted' });
        })
    });
};