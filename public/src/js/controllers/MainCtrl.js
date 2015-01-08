// public/js/controllers/MainCtrl.js

angular.module('goals').controller('MainController', function($scope, $modal) {

	// modal generation
	// new goal modal
	$scope.createGoalModal = function() {

		var modal = $modal.open({
			templateUrl: 'views/modals/goal-modal.html',
			controller: 'GoalModalController'
		});
		
	};
    
});