// public/src/js/controllers/ModalService.js

angular.module('goals').service('ModalService', function($modal, $location) {
    return {
        // modals

        // alert modal
        alertModal : function(title, message) {
            var modal = $modal.open({
                templateUrl: 'views/modals/alert-modal.html',
                controller: 'AlertModalController',
                resolve: {
                    title: function() { return title; },
                    message: function() { return message; },

                }
            });
        },

        // alert modal that waits for user response before callback
        awaitDismissAlertModal : function(title, message, callback) {
            var modal = $modal.open({
                templateUrl: 'views/modals/alert-modal.html',
                controller: 'AlertModalController',
                backdrop: 'static',
                windowClass: 'backdrop-hide-content',
                resolve: {
                    title: function() { return title; },
                    message: function() { return message; }
                }
            });

            modal.result.then(callback, callback);
        },

        // confirm modal
        confirmModal : function(message, callback) {
            var modal = $modal.open({
                templateUrl: 'views/modals/confirm-modal.html',
                controller: 'ConfirmModalController',
                resolve: {
                    message: function() { return message; }
                }
            });

            modal.result.then(callback);
        },

        // new goal modal
        createGoalModal : function(projectId, parentId, beginDate, endDate, categories, callback) {
            var $this = this;

            var modal = $modal.open({
                templateUrl: 'views/modals/goal-modal.html',
                controller: 'GoalModalController',
                resolve: {
                    method: function() { return 'create'; },
                    goal: function() { return {
                            name: null,
                            description: null,
                            beginDate: (beginDate ? beginDate : null),
                            endDate: (endDate ? endDate : null),
                            percentComplete: 0,
                            categoryId: null,
                            projectId: projectId,
                            parentId: parentId
                        };
                    },
                    categories: function() { return categories; }
                }
            });

            modal.result.then(callback);
        },

        // update goal modal
        updateGoalModal : function(goal, categories, updateCallback, dismissalCallback) {
            var $this = this;

            var modal = $modal.open({
                templateUrl: 'views/modals/goal-modal.html',
                controller: 'GoalModalController',
                resolve: {
                    method: function() { return 'update'; },
                    goal: function() { return angular.copy(goal); },
                    categories: function() { return categories; }
                }
            });

            modal.result.then(updateCallback, dismissalCallback);
        },

        // new note modal
        createNoteModal : function(projectId, parentId, callback) {
            var $this = this;

            var modal = $modal.open({
                templateUrl: 'views/modals/note-modal.html',
                controller: 'NoteModalController',
                resolve: {
                    method: function() { return 'create'; },
                    note: function() { return {
                            name: null,
                            description: null,
                            dateAdded: new Date(),
                            projectId: projectId,
                            parentId: parentId
                        };
                    }
                }
            });

            modal.result.then(callback);
        },

        // update note modal
        updateNoteModal : function(note, updateCallback, dismissalCallback) {
            var $this = this;

            var modal = $modal.open({
                templateUrl: 'views/modals/note-modal.html',
                controller: 'NoteModalController',
                resolve: {
                    method: function() { return 'update'; },
                    note: function() { return angular.copy(note); }
                }
            });

            modal.result.then(updateCallback, dismissalCallback);
        },

        // new category modal
        createCategoryModal : function(projectId, callback) {
            var $this = this;

            var modal = $modal.open({
                templateUrl: 'views/modals/category-modal.html',
                controller: 'CategoryModalController',
                resolve: {
                    method: function() { return 'create'; },
                    category: function() { return {
                            name: null,
                            description: null,
                            color: 'cat-default',
                            projectId: projectId
                        };
                    }
                }
            });

            modal.result.then(callback);
        },

        // update category modal
        updateCategoryModal : function(category, updateCallback, dismissalCallback) {
            var $this = this;

            var modal = $modal.open({
                templateUrl: 'views/modals/category-modal.html',
                controller: 'CategoryModalController',
                resolve: {
                    method: function() { return 'update'; },
                    category: function() { return angular.copy(category); }
                }
            });

            modal.result.then(updateCallback, dismissalCallback);
        },

        // new milestone modal
        createMilestoneModal : function(projectId, parentId, categories, callback) {
            var $this = this;

            var modal = $modal.open({
                templateUrl: 'views/modals/milestone-modal.html',
                controller: 'MilestoneModalController',
                resolve: {
                    method: function() { return 'create'; },
                    milestone: function() { return {
                            name: null,
                            date: new Date(),
                            percentComplete: 0,
                            categoryId: null,
                            projectId: projectId,
                            parentId: parentId
                        };
                    },
                    categories: function() { return categories; }
                }
            });

            modal.result.then(callback);
        },

        // update milestone modal
        updateMilestoneModal : function(milestone, categories, updateCallback, dismissalCallback) {
            var $this = this;

            var modal = $modal.open({
                templateUrl: 'views/modals/milestone-modal.html',
                controller: 'MilestoneModalController',
                resolve: {
                    method: function() { return 'update'; },
                    milestone: function() { return angular.copy(milestone); },
                    categories: function() { return categories; }
                }
            });

            modal.result.then(updateCallback, dismissalCallback);
        }
    };
});