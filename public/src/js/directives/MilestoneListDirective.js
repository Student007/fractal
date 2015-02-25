// public/js/controllers/MilestoneListDirective.js

angular.module('goals').directive('milestoneList', function($location) {
	return {
		restrict: 'AE',
		templateUrl: '../../views/milestone-list.html',
        link: function($scope, elem, attr, ctrl) {
            $scope.barEdit = function(milestone, e) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                $scope.milestoneActions.update(milestone);
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