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
    };
});