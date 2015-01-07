// public/js/controllers/GoalCtrl.js

angular.module('goals').controller('GoalController', function($scope, $routeParams, PageService) {
    $scope.id   = $routeParams.goalId;   
    $scope.p = null;

    PageService.getGoalLanding($scope.id).then(function(result) {
        $scope.p = result.data;
    });
});