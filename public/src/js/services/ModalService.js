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
                    message: function() { return message; }
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
        createGoalModal : function(projectId, parentId, callback) {
            var $this = this;

            var modal = $modal.open({
                templateUrl: 'views/modals/goal-modal.html',
                controller: 'GoalModalController',
                resolve: {
                    method: function() { return 'create'; },
                    goal: function() { return {
                            name: null,
                            description: null,
                            beginDate: null,
                            endDate: null,
                            percentComplete: 0,
                            categoryId: null,
                            projectId: projectId,
                            parentId: parentId
                        };
                    }
                }
            });

            modal.result.then(callback);
        },

        // update goal modal
        updateGoalModal : function(goal, updateCallback, dismissalCallback) {
            var $this = this;

            var modal = $modal.open({
                templateUrl: 'views/modals/goal-modal.html',
                controller: 'GoalModalController',
                resolve: {
                    method: function() { return 'update'; },
                    goal: function() { return JSON.parse(JSON.stringify(goal)); }
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
                    note: function() { return JSON.parse(JSON.stringify(note)); }
                }
            });

            modal.result.then(updateCallback, dismissalCallback);
        },

        // new milestone modal
        createMilestoneModal : function(projectId, parentId, callback) {
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
                    }
                }
            });

            modal.result.then(callback);
        },

        // update milestone modal
        updateMilestoneModal : function(milestone, updateCallback, dismissalCallback) {
            var $this = this;

            var modal = $modal.open({
                templateUrl: 'views/modals/milestone-modal.html',
                controller: 'MilestoneModalController',
                resolve: {
                    method: function() { return 'update'; },
                    milestone: function() { return JSON.parse(JSON.stringify(milestone)); }
                }
            });

            modal.result.then(updateCallback, dismissalCallback);
        },
    };
});