// public/js/services/MilestoneService.js
angular.module('goals').factory('MilestoneService', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/milestones');
        },

        getByParent : function(id) {
            return $http.get('/api/milestones/by-parent/' + id);
        },

        create : function(milestoneData) {
            return $http.post('/api/milestones', milestoneData);
        },

        update : function(milestoneData) {
            return $http.put('/api/milestones/' + milestoneData._id, milestoneData);
        },

        delete : function(id) {
            return $http.delete('/api/milestones/' + id);
        }
    };       
}]);