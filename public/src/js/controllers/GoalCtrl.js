// public/js/controllers/GoalCtrl.js

angular.module('goals').controller('GoalController', function($scope, $routeParams, PageService) {
    $scope.id          = $routeParams.goalId;   
    $scope.goal        = null;
    $scope.project     = null;
    $scope.subgoals    = [];
    $scope.notes       = [];
    $scope.milestones  = [];
    $scope.categories  = [];
    $scope.breadcrumbs = [];

    PageService.getGoalLanding($scope.id).then(function(result) {
        $scope.goal        = result.data.goal;
        $scope.project     = result.data.project;
        $scope.subgoals    = result.data.subgoals;
        $scope.notes       = result.data.notes;
        $scope.milestones  = result.data.milestones;
        $scope.categories  = result.data.categories;
        $scope.breadcrumbs = result.data.breadcrumbs;
    });
});