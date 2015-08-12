'use strict';

angular.module('parkattackgithubioApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/steps', {
        templateUrl: 'views/steps.html',
        controller: 'StepsCtrl',
        controllerAs: 'steps'
      })
      .otherwise({
        redirectTo: '/'
      });
  });