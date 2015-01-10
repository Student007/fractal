// app/routes/category.js

var Category = require('../models/category');

module.exports = function(app) {
    //get all categories
    app.get('/api/categories', function(req, res) {
        Category.find(function(err, categories) {
            if (err) res.send(err); else res.json(categories);
        });
    });

    //get all categories for a project
    app.get('/api/categories/by-project/:project_id', function(req, res) {
        Category.find({ projectId : req.params.project_id }, function(err, categories) {
            if (err) res.send(err); else res.json(categories);
        });
    });

    //get all top-level categories for a project
    app.get('/api/categories/by-project/:project_id/top', function(req, res) {
        Category.find({ projectId : req.params.project_id, parentId : null }, function(err, categories) {
            if (err) res.send(err); else res.json(categories);
        });
    });

    //get all child categories for a parent goal
    app.get('/api/categories/by-parent/:parent_id', function(req, res) {
        Category.find({ parentId : req.params.parent_id }, function(err, categories) {
            if (err) res.send(err); else res.json(categories);
        });
    });

    // get a single category
    app.get('/api/categories/:category_id', function(req, res) {
        Category.findById(req.params.category_id, function(err, category) {
            if (err) res.send(err); else res.json(category);
        });
    });

    // update a single category
    app.put('/api/categories/:category_id', function(req, res) {
        Category.findById(req.params.category_id, function(err, category) {
            if (err) {
                res.send(err);
            } else {
                category.name = req.body.name;
                category.description = req.body.description;
                category.color = req.body.color;
                category.projectId = req.body.projectId;

                category.save(function(err, category) {
                    if (err) res.send(err); else res.json({ success: category});
                });
            }
        });
    });

    // create a category
    app.post('/api/categories', function(req, res) {
        if (req.body.parentId == "") {
            delete req.body.parentId;
        }

        var category = new Category(req.body);

        category.save(function(err, category) {
            if (err) res.send(err); else res.json({ success: category});
        });
    });

    // delete a category
    app.delete('/api/categories/:category_id', function(req, res) {
        Category.remove({
            _id: req.params.category_id
        }, function(err, category) {
            if (err) res.send(err); else res.json({ success: 'Category Deleted' });
        })
    });
};