// public/src/js/GoalModalCtrl.js

angular.module('goals').controller('GoalModalController', function($scope, $modalInstance, method) {
    $scope.method = method;
    $scope.goal = {
        name: '',
        description: '',
        beginDate: null
    };
    $scope.open = {
        beginDate: false,
        endDate: false
    };

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.openDateDialog = function($event, which){
        $event.preventDefault();
        $event.stopPropagation();
        $scope.open.beginDate = false;
        $scope.open.endDate = false;
        $scope.open[which] = true;
    };
});