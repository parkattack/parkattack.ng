'use strict';

/**
 * @ngdoc function
 * @name parkattackgithubioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parkattackgithubioApp
 */
angular.module('parkattackgithubioApp')
  .controller('MainCtrl', function ($scope, $location, Auth) {
    if ($location.host() == 'localhost'){
      $scope.debug = true;
    }
    $scope.user = {};
    $scope.logout = function () {
      Auth.$unauth();
      $scope.user = {};
    };
    $scope.login = function () {
      Auth.$authWithPassword({
        email: $scope.user.email,
        password: $scope.user.email
      }).then(function(authData) {
        $scope.user.uid = authData.uid;
      }).catch(function(error) {
        $scope.error = error;
        $scope.register();
      });
    };
    $scope.register = function () {
      Auth.$createUser({
        email: $scope.user.email,
        password: $scope.user.email
      }).then(function(userData) {
        $scope.login();
      }).catch(function(error) {
        $scope.error = error;
      });
    };
    $scope.auth = Auth;
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      if (authData) {
        if (authData.uid) {
          $scope.user.uid = authData.uid;
        }
        if (authData.password) {
          if (authData.password.profileImageURL) {
            $scope.user.avatar = authData.password.profileImageURL;
          }
          if (authData.password.email) {
            $scope.user.email = authData.password.email;
          }
        }
      }
    });
  });
