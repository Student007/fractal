// public/src/js/CategoryModalCtrl.js

angular.module('goals').controller('CategoryModalController', function($scope, $modalInstance, $filter, method, category) {
    $scope.method = method;
    $scope.category = category;

    $scope.ok = function () {
        $modalInstance.close($scope.category);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.delete = function() {
        $modalInstance.dismiss('delete');
    };
});