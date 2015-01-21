// public/js/appRoutes.js

angular.module('goals').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

$routeProvider

    // home page
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })

    // project page
    .when('/projects', {
        templateUrl: 'views/project-list.html',
        controller: 'ProjectListController'
    })

    // new project
    .when('/project/new', {
        templateUrl: 'views/project-management.html',
        controller: 'ProjectManagementController',
        resolve: {
            method: function() { return 'create'; }
        }
    })

    // project view
    .when('/project/:projectId', {
        templateUrl: 'views/goal-item.html',
        controller: 'ProjectController'
    })

    // project edit
    .when('/project/:projectId/manage', {
        templateUrl: 'views/project-management.html',
        controller: 'ProjectManagementController',
        resolve: {
            method: function() { return 'update'; }
        }
    })

    // goal page
    .when('/project/:projectId/goal/:goalId', {
        templateUrl: 'views/goal-item.html',
        controller: 'GoalController'
    });

$locationProvider.html5Mode(true);

}]);