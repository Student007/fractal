// public/js/controllers/GoalListDirective.js

angular.module('goals').directive('goalList', function($location) {
    return {
        restrict: 'AE',
        templateUrl: '../../views/goal-list.html',
        link: function($scope, elem, attr, ctrl) {
            $scope.barEdit = function(goal, e) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                $scope.goalActions.update(goal);
            };

            $scope.barGoTo = function(loc, e) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                $location.path(loc);
            };
        }
    };
});