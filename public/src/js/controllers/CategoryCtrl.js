// public/src/js/controllers/CategoryCtrl.js

angular.module('goals').controller('CategoryController', function($scope, $routeParams, $location, CategoryService, ModalService) {
    $scope.id           = $routeParams.projectId;
    $scope.categories   = [];
    $scope.loadComplete = false;
    
    var assignData    = function(result) {
        console.log(result.data);
        if (result.error) {    
            $scope.errorActions.errorRelocateToProject($routeParams.projectId, result.error.message);
        } else {
            $scope.categories = result.data;
            $scope.loadComplete = true;
        }
    };

    CategoryService.getByProject($scope.id).then(assignData);

    $scope.back = function() {
        $location.path('/project/' + $scope.id);
    };

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
        ModalService.updateCategoryModal(category, function(category) {
            CategoryService.update(category).then(function(result) {
                if (result.data.success) {
                    ModalService.alertModal('Success', 'Category updated successfully!');
                    CategoryService.getByProject($scope.id).then(assignData);
                }
            });
        }, function(dismissal) {
            if (dismissal === 'delete') {
                $scope.delete(category);
            }
        });
    };

    $scope.delete = function(category) {
        ModalService.confirmModal("Are you sure you want to delete this category?", function(proceed) {
            if (proceed) {
                CategoryService.delete(category._id).then(function() {
                    CategoryService.getByProject($scope.id).then(assignData);
                });
            }
        });
    };
});