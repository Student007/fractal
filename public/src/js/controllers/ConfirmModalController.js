// public/src/js/ConfirmModalCtrl.js

angular.module('goals').controller('ConfirmModalController', function($scope, $sce, $modalInstance, message) {
    $scope.message = $sce.trustAsHtml(message);
    
    $scope.yes = function () {
        $modalInstance.close(true);
    };

    $scope.no = function() {
        $modalInstance.close(false);
    };

    $scope.cancel = function() {
        $modalInstance.close(false);
    };
});