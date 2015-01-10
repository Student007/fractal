// public/src/js/controllers/ModalService.js

angular.module('goals').service('ModalService', function($modal, $location, PageService, GoalService) {
    return {
        // modals

        // alert modal
        alertModal : function(status, message) {
            var modal = $modal.open({
                templateUrl: 'views/modals/alert-modal.html',
                controller: 'AlertModalController',
                resolve: {
                    status: function() { return status; },
                    message: function() { return message; }
                }
            });
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
        createGoalModal : function(projectId, parentId) {
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

            modal.result.then(function(goal) {
                GoalService.create(goal).then(function(result) {
                    if (result.data.success) {
                        PageService.reloadData();
                        $this.alertModal('success', 'Goal created successfully!');
                    }
                });
            });
        },

        // update goal modal
        updateGoalModal : function(goal) {
            var $this = this;

            var modal = $modal.open({
                templateUrl: 'views/modals/goal-modal.html',
                controller: 'GoalModalController',
                resolve: {
                    method: function() { return 'update'; },
                    goal: function() { return JSON.parse(JSON.stringify(goal)); }
                }
            });

            modal.result.then(function(goal) {
                GoalService.update(goal).then(function(result) {
                    if (result.data.success) {
                        PageService.reloadData();
                        $this.alertModal('success', 'Goal updated successfully!');
                    }
                });
            }, function(dismissal) {
                if (dismissal === 'delete') {
                    $this.deleteGoalModal(goal);
                }
            });
        },

        // delete goal with confirmation and relocate
        deleteGoalModal : function(goal) {
            this.confirmModal("Are you sure you want to delete this goal? <br /><br />All associated subgoals, notes, and milestones will be deleted as well.", function(proceed) {
                if (proceed) {
                    GoalService.delete(goal._id).then(function(result) {
                        if (result.data.success) {
                            if (goal._id === PageService.getActiveItem()._id) {
                                var path = '/project/' + goal.projectId;

                                if (goal.parentId !== null) {
                                    path = path + '/goal/' + goal.parentId;
                                }

                                $location.path(path);
                            } else {
                                PageService.reloadData();
                            }
                        }
                    });
                }
            });
        }
    };
});