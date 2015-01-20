// public/src/js/controllers/GoalCtrl.js

angular.module('goals').controller('GoalController', function($scope, $routeParams, PageService) {
    $scope.id          = $routeParams.goalId;
    $scope.isGoal      = true;
       
    $scope.goal        = null;
    $scope.project     = null;
    $scope.subgoals    = [];
    $scope.notes       = [];
    $scope.milestones  = [];
    $scope.categories  = [];
    $scope.breadcrumbs = [];

    var assignData = function(result) {
        if (result.error) {    
            $scope.errorActions.errorRelocateToProject($routeParams.projectId, result.error.message);
        } else {
            $scope.goal        = result.goal;
            $scope.project     = result.project;
            $scope.subgoals    = result.subgoals;
            $scope.notes       = result.notes;
            $scope.milestones  = result.milestones;
            $scope.categories  = result.categories;
            $scope.breadcrumbs = result.breadcrumbs;
        }
    };

    PageService.getGoalLanding($scope.id).then(assignData);
    $scope.$on('data-reload', function(event, result) { 
        assignData(result);
    });
});