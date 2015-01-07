// public/js/controllers/GoalListDirective.js

angular.module('goals').directive('goalList', function() {
	return {
		restrict: 'AE',
		scope: {
			goals: '=',
			project: '='
		},
		templateUrl: '../../views/goal-list.html'
	};
});