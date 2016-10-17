angular.module('MyApp', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        controller: 'HomeController',
        templateUrl: 'partials/home.html'
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });


  })
  .run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  });
