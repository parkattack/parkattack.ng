'use strict';

/**
 * @ngdoc function
 * @name parkattackgithubioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parkattackgithubioApp
 */
angular.module('parkattackgithubioApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, Auth, User) {
    $scope.debug = $rootScope.debug;
    $scope.user = $rootScope.user;
    $scope.logout = function () {
      Auth.$unauth();
      $scope.user = $rootScope.user = {};
    };
    $scope.go = function () {
      Auth.$authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(authData) {
        if (authData && authData.uid) {
          $scope.user = $rootScope.user = User.get(authData.uid);
        }
      }).catch(function(error) {
        $scope.error = error;
        $scope.register();
      });
    };
    $scope.register = function () {
      $location.path('/register/' + $scope.user.email);
    };
  });
