// public/src/js/NoteModalCtrl.js

angular.module('goals').controller('NoteModalController', function($scope, $modalInstance, $filter, method, note) {
    $scope.method = method;
    
    $scope.note = note;

    $scope.ok = function () {
        $modalInstance.close($scope.note);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.delete = function() {
        $modalInstance.dismiss('delete');
    };
});