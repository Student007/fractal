// public/js/services/CategoryService.js
angular.module('goals').factory('CategoryService', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/categories');
        },

        getByProject : function(id) {
            return $http.get('/api/categories/by-project/' + id);
        },

        create : function(categoryData) {
            return $http.post('/api/categories', categoryData);
        },

        update : function(categoryData) {
            return $http.put('/api/categories/' + categoryData._id, categoryData);
        },

        delete : function(id) {
            return $http.delete('/api/categories/' + id);
        }
    };       
}]);