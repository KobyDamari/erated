var eRated = angular.module('getJob', ['ngRoute']);
    // configure our routes
    eRated.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mini-plugin'
            })
    });