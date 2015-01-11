// public/src/js/MilestoneModalCtrl.js

angular.module('goals').controller('MilestoneModalController', function($scope, $modalInstance, $filter, method, milestone) {
    $scope.method = method;
    
    $scope.milestone = milestone;

    if ($scope.milestone.date !== null) {
        $scope.milestone.date = new Date($scope.milestone.date);
    }

    $scope.ok = function () {
        $modalInstance.close($scope.milestone);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.delete = function() {
        $modalInstance.dismiss('delete');
    };
});