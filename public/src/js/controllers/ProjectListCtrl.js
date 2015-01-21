// public/src/js/controllers/ProjectListCtrl.js

angular.module('goals').controller('ProjectListController', function($scope, $routeParams, ProjectService) {
    $scope.projects = [];

    ProjectService.get().then(function(result) {
        $scope.projects = result.data;
    });
});