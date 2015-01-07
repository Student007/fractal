// public/js/controllers/BreadcrumbDirective.js

angular.module('goals').directive('breadcrumbs', function() {
	return {
		restrict: 'E',
		scope: {
			project: '=',
			trail: '=',
			goal: '='
		},
		templateUrl: '../../views/breadcrumbs.html'
	};
});