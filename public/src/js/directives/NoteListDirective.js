// public/js/controllers/NoteListDirective.js

angular.module('goals').directive('noteList', function() {
	return {
		restrict: 'AE',
		templateUrl: '../../views/note-list.html'
	};
});