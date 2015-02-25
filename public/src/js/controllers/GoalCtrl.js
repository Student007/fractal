// public/src/js/controllers/GoalCtrl.js

angular.module('goals').controller('GoalController', function($scope, $routeParams, $filter, $location,
    PageService, GoalService, NoteService, MilestoneService, TimelineService, isGoal) {

    $scope.isGoal       = isGoal;
    $scope.id           = ( isGoal ? $routeParams.goalId : $routeParams.projectId);
    $scope.loadComplete = false;
       
    $scope.goal        = { _id : null,
                           beginDate: null,
                           endDate: null
                         };
    $scope.project     = null;
    $scope.subgoals    = null;
    $scope.notes       = [];
    $scope.milestones  = [];
    $scope.categories  = [];
    $scope.breadcrumbs = [];

    $scope.subgoalPercentage = $scope.goalActions.averagePercentage($scope.subgoals);

    $scope.timeline           = new TimelineService($scope.goal.beginDate, 
        $scope.goal.endDate, $scope.subgoals, $scope.milestones);
    $scope.timelineSubgoals   = $scope.timeline.appendSubgoalTimelines();
    $scope.timelineMilestones = $scope.timeline.appendMilestoneTimelines();
    $scope.timeDetails        = $scope.timeline.getGoalDateInfo();
    $scope.dateTimeline       = $scope.timeline.getDateTimeline();

    $scope.getCategoryName = function(id) {
        var found = $filter('filter')($scope.categories, {_id: id}, true);
        if (found.length) {
            return found[0].name;
        } else {
            return 'None';
        }
    };

    $scope.getCategoryColor = function(id) {
        var found = $filter('filter')($scope.categories, {_id: id}, true);
        if (found.length) {
            return found[0].color;
        } else {
            return 'cat-default';
        }
    };

    var assignData = function(result) {
        if (result.error) {
            if ($scope.isGoal) {    
                $scope.errorActions.errorRelocateToProject($routeParams.projectId, result.error.message);
            } else {
                $scope.errorActions.errorRelocateToMain(result.error.message);
            }
        } else {
            $scope.goal        = result.goal;
            $scope.project     = result.project;
            $scope.subgoals    = result.subgoals;
            $scope.notes       = result.notes;
            $scope.milestones  = result.milestones;
            $scope.categories  = result.categories;
            $scope.breadcrumbs = result.breadcrumbs;

            $scope.subgoalPercentage  = $scope.goalActions.averagePercentage($scope.subgoals);

            $scope.timeline           = new TimelineService($scope.goal.beginDate, 
                $scope.goal.endDate, $scope.subgoals, $scope.milestones);
            $scope.timelineSubgoals   = $scope.timeline.appendSubgoalTimelines();
            $scope.timelineMilestones = $scope.timeline.appendMilestoneTimelines();
            $scope.timeDetails        = $scope.timeline.getGoalDateInfo();
            $scope.dateTimeline       = $scope.timeline.getDateTimeline();

            $scope.loadComplete = true;

            var addItemsToSubgoal = function(index, subItemCat) {
                return function(result) {
                    if (!(result.error)) {
                        $scope.timelineSubgoals[index][subItemCat] = result.data;
                    }
                };
            };

            for (var s in $scope.timelineSubgoals) {
                var curId = $scope.timelineSubgoals[s].goal._id;
                GoalService.getByParent(curId).then(addItemsToSubgoal(s, 'subgoals'));
                NoteService.getByParent(curId).then(addItemsToSubgoal(s, 'notes'));
                MilestoneService.getByParent(curId).then(addItemsToSubgoal(s, 'milestones'));
            }
        }
    };

    if ($scope.isGoal) {
        PageService.getGoalLanding($scope.id).then(assignData);
    } else {
        PageService.getProjectLanding($scope.id).then(assignData);
    }

    $scope.$on('data-reload', function(event, result) { 
        assignData(result);
    });
});