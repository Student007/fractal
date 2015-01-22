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

    $scope.create = function() {
        ModalService.createCategoryModal($scope.id, function(category) {
            CategoryService.create(category).then(function(result) {
                if (result.data.success) {
                    ModalService.alertModal('Success', 'Category created successfully!');
                    CategoryService.getByProject($scope.id).then(assignData);
                }
            });
        });
    };

    $scope.update = function(category) {
        CategoryService.update(category).then(function(result) {
            if (result.data.success) {
                ModalService.alertModal('Success', 'Category updated successfully!');
                CategoryService.getByProject($scope.id).then(assignData);
            }
        });
    };

    $scope.delete = function(category) {
        ModalService.confirmModal("Are you sure you want to delete this project?<br /><br />Everything associated with this project will be lost forever.", function(proceed) {
            if (proceed) {
                CategoryService.delete(category._id);
                CategoryService.getByProject($scope.id).then(assignData);
            }
        });
    };
});