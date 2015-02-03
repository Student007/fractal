// public/js/services/GoalService.js
angular.module('goals').factory('GoalService', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/goals');
        },

        getByParent : function(id) {
            return $http.get('/api/goals/by-parent/' + id);
        },

        create : function(goalData) {
            return $http.post('/api/goals', goalData);
        },

        update : function(goalData) {
            return $http.put('/api/goals/' + goalData._id, goalData);
        },

        delete : function(id) {
            return $http.delete('/api/goals/' + id);
        }
    };       
}]);