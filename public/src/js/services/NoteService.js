// public/js/services/NoteService.js
angular.module('goals').factory('NoteService', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/notes');
        },

        create : function(noteData) {
            return $http.post('/api/notes', noteData);
        },

        update : function(noteData) {
            return $http.put('/api/notes/' + noteData._id, noteData);
        },

        delete : function(id) {
            return $http.delete('/api/notes/' + id);
        }
    };       
}]);