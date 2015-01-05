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
        templateUrl: 'views/project.html',
        controller: 'ProjectController'
    });

$locationProvider.html5Mode(true);

}]);