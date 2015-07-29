'use strict';

/**
 * @ngdoc function
 * @name parkattackgithubioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parkattackgithubioApp
 */
angular.module('parkattackgithubioApp')
  .controller('MainCtrl', function ($scope) {
    $scope.register = function () {
      var ref = new Firebase("https://parkattack.firebaseio.com");
      ref.createUser({
        email: $scope.user.email,
        password: $scope.user.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          $scope.user.uid = userData.uid;
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });
    };
  });
