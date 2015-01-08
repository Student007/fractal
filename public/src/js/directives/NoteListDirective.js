// public/js/controllers/NoteListDirective.js

angular.module('goals').directive('noteList', function() {
	return {
		restrict: 'AE',
		scope: {
			notes: '=',
			project: '='
		},
		templateUrl: '../../views/note-list.html'
	};
});