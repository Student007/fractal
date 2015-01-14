// public/js/controllers/CategorySelectDirective.js

angular.module('goals').directive('categorySelect', function() {
	return {
		restrict: 'AE',
		scope: {
			categories: '=',
			model: '='
		},
		templateUrl: '../../views/category-select.html'
	};
});