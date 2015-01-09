// public/src/js/GoalModalCtrl.js

angular.module('goals').controller('GoalModalController', function($scope, $modalInstance, method, projectId, parentId) {
    $scope.method = method;
    
    $scope.goal = {
        name: '',
        description: '',
        beginDate: null,
        endDate: null,
        percentComplete: 0,
        categoryId: null,
        parentId: parentId,
        projectId: projectId
    };

    $scope.open = {
        beginDate: false,
        endDate: false
    };

    $scope.ok = function () {
        $modalInstance.close($scope.goal);
    };

    $scope.cancel = function () {
        console.log(parentId);
        console.log(projectId);
        $modalInstance.dismiss('cancel');
    };

    $scope.openDateDialog = function($event, which) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.open.beginDate = false;
        $scope.open.endDate = false;
        $scope.open[which] = true;
    };

    $scope.invalidDate = function(begin, end) {
        if (begin !== null && end !== null) {
            return (end > begin);
        }
        return true;
    };
});