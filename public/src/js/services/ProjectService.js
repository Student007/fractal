// public/js/services/ProjectService.js
angular.module('goals').factory('ProjectService', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/projects');
        },

        create : function(projectData) {
            return $http.post('/api/projects', projectData);
        },

        put : function(projectData) {
            return $http.put('/api/projects', projectData);
        },

        delete : function(id) {
            return $http.delete('/api/projects/' + id);
        }
    };       
}]);