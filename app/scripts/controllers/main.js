'use strict';

/**
 * @ngdoc function
 * @name parkattackgithubioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parkattackgithubioApp
 */
angular.module('parkattackgithubioApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, $routeParams, Auth, User) {
    $scope.debug = $rootScope.debug;
    $scope.user = $rootScope.user;
    $scope.showRegistration = false;
    $scope.logout = function () {
      Auth.$unauth();
      $scope.user = $rootScope.user = {};
    };
    $scope.go = function (registerFirst) {
      if (registerFirst) {
        Auth.$createUser({
          email: $scope.user.email,
          password: $scope.user.password
        }).then(function(userData) {
          Auth.$authWithPassword({
            email: $scope.user.email,
            password: $scope.user.password
          }).then(function(authData) {
            User.add(authData.uid, {
              email: $scope.user.email,
              name: $scope.user.name,
              company: $scope.user.company,
              avatar: authData.password.profileImageURL
            });
            //todo: fix add to return a promise and redirect on success
            $location.path('/steps');
          }).catch(function(error) {
            $scope.error = error;
          });
        }).catch(function(error) {
          $scope.error = error;
        });
      } else {
        Auth.$authWithPassword({
          email: $scope.user.email,
          password: $scope.user.password
        }).then(function(authData) {
          if (authData && authData.uid) {
            $scope.user = $rootScope.user = User.get(authData.uid);
          }
          $location.path('/steps');
        }).catch(function(error) {
          $scope.error = error;
        });
    }
    };
  });
