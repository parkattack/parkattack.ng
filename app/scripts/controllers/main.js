'use strict';

/**
 * @ngdoc function
 * @name parkattackgithubioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parkattackgithubioApp
 */
angular.module('parkattackgithubioApp')
  .controller('MainCtrl', function ($scope, $location, Auth, User) {
    if ($location.host() == 'localhost'){
      $scope.debug = true;
    }
    $scope.user = {};
    $scope.logout = function () {
      Auth.$unauth();
      $scope.user = {};
    };
    $scope.go = function () {
      Auth.$authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(authData) {
        if (authData && authData.uid) {
          $scope.user = User.get(authData.uid);
        }
      }).catch(function(error) {
        $scope.error = error;
        $scope.register();
      });
    };
    $scope.register = function () {
      $location.path('/register/' + $scope.user.email);
    };
    $scope.auth = Auth;
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      if (authData && authData.uid) {
        $scope.user = User.get(authData.uid);
      }
    });
  });
