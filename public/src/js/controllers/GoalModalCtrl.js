// public/src/js/GoalModalCtrl.js

angular.module('goals').controller('GoalModalController', function($scope, $modalInstance, $filter, method, goal, categories) {
    $scope.method = method;
    $scope.categories = categories;
    $scope.goal = goal;

    if ($scope.goal.beginDate !== null) {
        $scope.goal.beginDate = new Date($scope.goal.beginDate);
    }
    if ($scope.goal.endDate !== null) {
        $scope.goal.endDate = new Date($scope.goal.endDate);
    }

    $scope.ok = function () {
        $modalInstance.close($scope.goal);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.delete = function() {
        $modalInstance.dismiss('delete');
    };

    $scope.resetDates = function() {
        goal.beginDate = null;
        goal.endDate = null;
    };

    $scope.invalidDate = function(begin, end) {
        if (begin !== null && end !== null) {
            return (end > begin);
        }
        return true;
    };
});