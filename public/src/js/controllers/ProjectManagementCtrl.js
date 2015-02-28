// public/src/js/controllers/ProjectManagementCtrl.js

angular.module('goals').controller('ProjectManagementController', function($scope, $routeParams, $location, PageService, ModalService, ProjectService, method) {
    $scope.method       = method;
    $scope.loadComplete = false;

    var assignData = function(result) {
        if (result.error) {    
            $scope.errorActions.errorRelocateToMain(result.error.message);
        } else {
            $scope.project        = result.project;
            $scope.subgoals       = result.subgoals;
            $scope.notes          = result.notes;
            $scope.milestones     = result.milestones;
            $scope.categories     = result.categories;

            $scope.displayName    = angular.copy($scope.project.name);
            $scope.loadComplete   = true;
        }
    };

    if ($scope.method === "create") {
        $scope.loadComplete = true;
    }
    
    if ($scope.method === "update") {
        $scope.id      = $routeParams.projectId;
        PageService.getProjectLanding($scope.id).then(assignData);
        $scope.$on('data-reload', function(event, result) { 
            assignData(result);
        });
    }

    $scope.displayName = "None";
    $scope.project     = null;
    $scope.subgoals    = [];
    $scope.notes       = [];
    $scope.milestones  = [];
    $scope.categories  = [];

    $scope.create = function() {
        ProjectService.create($scope.project).then(function(result) {
            if (result.data.success) {
                ModalService.alertModal('Success', 'Project created successfully!');
                $location.path('/project/' + result.data.success._id);
            }
        });
    };

    $scope.update = function() {
        ProjectService.update($scope.project).then(function(result) {
            if (result.data.success) {
                ModalService.alertModal('Success', 'Project updated successfully!');
                history.back();
            }
        });
    };

    $scope.delete = function() {
        ModalService.confirmModal("Are you sure you want to delete this project?<br /><br />Everything associated with this project will be lost forever.", function(proceed) {
            if (proceed) {
                ProjectService.delete($scope.project._id);
                $location.path('/projects');
            }
        });
    };

    $scope.goBack = function() {
        history.back();
    };
});