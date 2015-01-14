// public/js/services/PageService.js

angular.module('goals').factory('PageService', function($http, $rootScope) {
    var page = {
        isGoal:      null,
        goal:        null,
        project:     null,
        subgoals:    [],
        notes:       [],
        milestones:  [],
        categories:  [],
        breadcrumbs: []
    };

    return {
        // call to get a project page
        getProjectLanding : function(id) {
            return $http.get('/api/pages/project/' + id).then(function(result) {
                if (result.data.error) {
                    return result.data;
                } else {
                    page.isGoal     = false;
                    page.goal       = { _id : null };
                    page.project    = result.data.project;
                    page.subgoals   = result.data.subgoals;
                    page.notes      = result.data.notes;
                    page.milestones = result.data.milestones;
                    page.categories = result.data.categories;

                    return page;
                }
            });
        },

        // call to get a goal page
        getGoalLanding : function(id) {
            return $http.get('/api/pages/goal/' + id).then(function(result) {
                if (result.data.error) {
                    return result.data;
                } else {
                    page.isGoal      = true;
                    page.goal        = result.data.goal;
                    page.project     = result.data.project;
                    page.subgoals    = result.data.subgoals;
                    page.notes       = result.data.notes;
                    page.milestones  = result.data.milestones;
                    page.categories  = result.data.categories;
                    page.breadcrumbs = result.data.breadcrumbs;

                    return page;
                }
            });
        },

        // resend request to retrieve data from server
        reloadData : function() {
            if (page.isGoal !== null) {
                var fn = null;
                if (page.isGoal) {
                    this.getGoalLanding(page.goal._id).then(function() {
                        $rootScope.$broadcast('data-reload', page);
                    });
                } else {
                    this.getProjectLanding(page.project._id).then(function() {
                        $rootScope.$broadcast('data-reload', page);
                    });
                }
            }
        },

        // return page
        getPage : function() {
            return page;
        },

        // get active item
        getActiveItem : function() {
            var active = (page.isGoal ? page.goal : page.project);
            active.isGoal = page.isGoal;
            return active;
        },

        // get available categories
        getCategories : function() {
            return page.categories;
        }
    };       
});