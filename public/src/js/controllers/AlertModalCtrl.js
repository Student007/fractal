// public/src/js/AlertModalCtrl.js

angular.module('goals').controller('AlertModalController', function($scope, $modalInstance, status, message) {
    $scope.status = status;
    $scope.message = message;
    
    $scope.ok = function () {
        $modalInstance.dismiss('ok');
    };
});