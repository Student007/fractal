// public/src/js/AlertModalCtrl.js

angular.module('goals').controller('AlertModalController', function($scope, $modalInstance, title, message) {
    $scope.title = title;
    $scope.message = message;
    
    $scope.ok = function () {
        $modalInstance.close('ok');
    };
});