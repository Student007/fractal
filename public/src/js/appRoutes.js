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
        controller: 'GoalController',
        resolve: {
            isGoal: function() { return false;}
        }
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
        controller: 'GoalController',
        resolve: {
            isGoal: function() { return true;}
        }
    })

    // category view/edit page
    .when('/project/:projectId/categories', {
        templateUrl: 'views/categories.html',
        controller: 'CategoryController'
    });

$locationProvider.html5Mode(true);

}]);