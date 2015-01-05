// public/js/services/ProjectService.js
angular.module('goals').factory('Project', ['$http', function($http) {
    return {
        // call to get all projects
        get : function() {
            return $http.get('/api/projects');
        },

        create : function(projectData) {
            return $http.post('/api/projects', projectData);
        },

        delete : function(id) {
            return $http.delete('/api/projects/' + id);
        }
    };       
}]);