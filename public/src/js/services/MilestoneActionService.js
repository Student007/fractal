// public/js/services/MilestoneActionService.js

angular.module('goals').factory('MilestoneActionService', function($http, $rootScope, $location, ModalService, PageService, MilestoneService) {
    return {
        create : function(projectId, parentId) {
            ModalService.createMilestoneModal(projectId, parentId, PageService.getCategories(), function(milestone) {
                MilestoneService.create(milestone).then(function(result) {
                    if (result.data.success) {
                        PageService.reloadData();
                        ModalService.alertModal('Success', 'Milestone created successfully!');
                    }
                });
            });
        },

        update : function(milestone) {
            var $this = this;
            ModalService.updateMilestoneModal(milestone, PageService.getCategories(), function(milestone) {
                MilestoneService.update(milestone).then(function(result) {
                    if (result.data.success) {
                        PageService.reloadData();
                        ModalService.alertModal('Success', 'Milestone updated successfully!');
                    }
                });
            }, function(dismissal) {
                if (dismissal === 'delete') {
                    $this.delete(milestone);
                }
            });
        },

        delete : function(milestone) {
            var $this = this;
            ModalService.confirmModal("Are you sure you want to delete this milestone?", function(proceed) {
                if (proceed) {
                    MilestoneService.delete(milestone._id);
                    PageService.reloadData();
                }
            });
        }
    };
});