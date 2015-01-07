// public/js/services/PageService.js

angular.module('goals').factory('PageService', ['$http', function($http) {
    return {
        // call to get all projects
        getProjectLanding : function(id) {
            return $http.get('/api/pages/project/' + id);
        },

        getGoalLanding : function(id) {
            return $http.get('/api/pages/goal/' + id);
        },
    };       
}]);