'use strict';

/**
 * @ngdoc function
 * @name parkAttackWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parkAttackWebApp
 */
angular.module('parkAttackWebApp')
  .controller('MainCtrl', function ($scope, $location, $routeParams, Auth, User) {
    $scope.showRegistration = false;
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
          $location.path('/steps');
        }).catch(function(error) {
          $scope.error = error;
        });
    }
    };
  });
