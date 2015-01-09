// public/js/services/GoalService.js
angular.module('goals').factory('GoalService', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/goals');
        },

        create : function(goalData) {
            return $http.post('/api/goals', goalData);
        },

        put : function(goalData) {
            return $http.put('/api/goals', goalData);
        },

        delete : function(id) {
            return $http.delete('/api/goals/' + id);
        }
    };       
}]);