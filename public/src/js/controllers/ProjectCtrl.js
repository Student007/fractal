// public/js/controllers/ProjectCtrl.js

angular.module('goals').controller('ProjectController', function($scope, $routeParams, PageService) {
    $scope.id          = $routeParams.projectId;   
    $scope.project     = null;
    $scope.subgoals    = [];
    $scope.notes       = [];
    $scope.milestones  = [];
    $scope.categories  = [];

    PageService.getProjectLanding($scope.id).then(function(result) {
        $scope.project     = result.data.project;
        $scope.subgoals    = result.data.subgoals;
        $scope.notes       = result.data.notes;
        $scope.milestones  = result.data.milestones;
        $scope.categories  = result.data.categories;
    });
});