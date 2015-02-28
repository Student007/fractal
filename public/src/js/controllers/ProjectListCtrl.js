// public/src/js/controllers/ProjectListCtrl.js

angular.module('goals').controller('ProjectListController', function($scope, $routeParams, ProjectService) {
    $scope.projects     = [];
    $scope.loadComplete = false;

    ProjectService.get().then(function(result) {
        $scope.projects = result.data;
        $scope.loadComplete = true;
    });
});