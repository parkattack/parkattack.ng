'use strict';

/**
 * @ngdoc overview
 * @name parkattackgithubioApp
 * @description
 * # parkattackgithubioApp
 *
 * Main module of the application.
 */
angular
  .module('parkattackgithubioApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
