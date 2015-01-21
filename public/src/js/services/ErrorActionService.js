// public/js/services/ErrorActionService.js

angular.module('goals').factory('ErrorActionService', function($http, $rootScope, $location, ModalService) {
    return {
        showError : function(message) {
            ModalService.alertModal("Error", message);
        },

        errorRelocateToProject : function(projectId, message) {
            ModalService.awaitDismissAlertModal("Error", message, function() {
                $location.path('/project/' + projectId);
            });
        },

        errorRelocateToMain : function(message) {
            ModalService.awaitDismissAlertModal("Error", message, function() {
                $location.path('/projects');
            });
        }, 

        errorRelocateTo : function(path, message) {
            ModalService.awaitDismissAlertModal("Error", message, function() {
                $location.path(path);
            });
        }
    };
});