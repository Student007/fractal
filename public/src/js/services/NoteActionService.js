// public/js/services/NoteActionService.js

angular.module('goals').factory('NoteActionService', function($http, $rootScope, $location, ModalService, PageService, NoteService) {
    return {
        create : function(projectId, parentId) {
            ModalService.createNoteModal(projectId, parentId, function(note) {
                NoteService.create(note).then(function(result) {
                    if (result.data.success) {
                        PageService.reloadData();
                        ModalService.alertModal('Success', 'Note created successfully!');
                    }
                });
            });
        },

        update : function(note) {
            var $this = this;
            ModalService.updateNoteModal(note, function(note) {
                NoteService.update(note).then(function(result) {
                    if (result.data.success) {
                        PageService.reloadData();
                        ModalService.alertModal('Success', 'Note updated successfully!');
                    }
                });
            }, function(dismissal) {
                if (dismissal === 'delete') {
                    $this.delete(note);
                }
            });
        },

        delete : function(note) {
            var $this = this;
            ModalService.confirmModal("Are you sure you want to delete this note?", function(proceed) {
                if (proceed) {
                    NoteService.delete(note._id);
                    PageService.reloadData();
                }
            });
        }
    };
});