// public/js/services/GoalActionService.js

angular.module('goals').factory('GoalActionService', function($http, $rootScope, $location, ModalService, PageService, GoalService) {
    return {
        relocateToParent : function(goal) {
            var path = '/project/' + goal.projectId;

            if (goal.parentId !== null) {
                path = path + '/goal/' + goal.parentId;
            }

            $location.path(path);
        },

        createGoal : function(projectId, parentId) {
            ModalService.createGoalModal(projectId, parentId, function(goal) {
                GoalService.create(goal).then(function(result) {
                    if (result.data.success) {
                        PageService.reloadData();
                        ModalService.alertModal('Success', 'Goal created successfully!');
                    }
                });
            });
        },

        updateGoal : function(goal) {
            var $this = this;
            ModalService.updateGoalModal(goal, function(goal) {
                GoalService.update(goal).then(function(result) {
                    if (result.data.success) {
                        PageService.reloadData();
                        ModalService.alertModal('Success', 'Goal updated successfully!');
                    }
                });
            }, function(dismissal) {
                if (dismissal === 'delete') {
                    $this.deleteGoal(goal);
                }
            });
        },

        deleteGoal : function(goal) {
            var $this = this;
            ModalService.confirmModal("Are you sure you want to delete this goal? <br /><br />All associated subgoals, notes, and milestones will be deleted as well.", function(proceed) {
                if (proceed) {
                    GoalService.delete(goal._id).then(function(result) {
                        if (result.data.success) {
                            if (goal._id === PageService.getActiveItem()._id) {
                                $this.relocateToParent(goal);
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