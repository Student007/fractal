// public/src/js/controllers/MainCtrl.js

angular.module('goals').controller('MainController', function($scope, $location, 
	ErrorActionService, GoalActionService, NoteActionService, MilestoneActionService) {
    $scope.errorActions     = ErrorActionService;
    $scope.goalActions      = GoalActionService;
    $scope.noteActions      = NoteActionService;
    $scope.milestoneActions = MilestoneActionService;

    $scope.barEdit = function(goal, e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        $scope.goalActions.update(goal);
    };

    $scope.barGoTo = function(loc, e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        $location.path(loc);
    };
});