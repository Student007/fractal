// public/src/js/controllers/MainCtrl.js

angular.module('goals').controller('MainController', function($scope, $location, ErrorActionService, GoalActionService) {
    $scope.errorActions = ErrorActionService;
    $scope.goalActions  = GoalActionService;
});