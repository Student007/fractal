// public/js/controllers/GoalListDirective.js

angular.module('goals').directive('goalList', function() {
	return {
		restrict: 'AE',
		templateUrl: '../../views/goal-list.html',
	};
});