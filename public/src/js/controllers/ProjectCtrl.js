// public/src/js/controllers/ProjectCtrl.js

angular.module('goals').controller('ProjectController', function($scope, $routeParams, PageService) {
    $scope.id          = $routeParams.projectId;
    $scope.isGoal      = false;
    
    $scope.goal        = { _id : null };
    $scope.project     = null;
    $scope.subgoals    = [];
    $scope.notes       = [];
    $scope.milestones  = [];
    $scope.categories  = [];

    var assignData = function(result) {
        if (result.error) {    
            $scope.errorActions.errorRelocateToMain(result.error.message);
        } else {
            $scope.goal           = result.goal;
            $scope.project        = result.project;
            $scope.subgoals       = result.subgoals;
            $scope.notes          = result.notes;
            $scope.milestones     = result.milestones;
            $scope.categories     = result.categories;
        }
    };

    PageService.getProjectLanding($scope.id).then(assignData);
    $scope.$on('data-reload', function(event, result) { 
        assignData(result);
    });
});