// public/src/js/controllers/MainCtrl.js

angular.module('goals').controller('MainController', function($scope, $location, 
	ErrorActionService, GoalActionService, NoteActionService, MilestoneActionService) {
    $scope.errorActions     = ErrorActionService;
    $scope.goalActions      = GoalActionService;
    $scope.noteActions      = NoteActionService;
    $scope.milestoneActions = MilestoneActionService;
});