// public/src/js/controllers/MainCtrl.js

angular.module('goals').controller('MainController', function($scope, $modal, $route, GoalService) {



	// modal generation
	// new goal modal
	$scope.createGoalModal = function(projectId, parentId) {
		var modal = $modal.open({
			templateUrl: 'views/modals/goal-modal.html',
			controller: 'GoalModalController',
			resolve: {
				method: function() { return 'create'; },
                projectId: function() { return projectId; },
                parentId: function() { return parentId; }
			}
		});

        modal.result.then(function(goal) {
            GoalService.create(goal).then(function(result) {
                if (result.data.success) {
                    $route.reload();
                }
            });
        });
	};
    
});