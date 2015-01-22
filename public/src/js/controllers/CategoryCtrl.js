// public/src/js/controllers/CategoryCtrl.js

angular.module('goals').controller('CategoryController', function($scope, $routeParams, CategoryService) {
    $scope.id         = $routeParams.projectId;
    $scope.categories = [];
    
    var assignData    = function(result) {
        if (result.error) {    
            $scope.errorActions.errorRelocateToProject($routeParams.projectId, result.error.message);
        } else {
            $scope.categories = results.data;
        }
    };

    CategoryService.getByProject($scope.id).then(assignData);
});