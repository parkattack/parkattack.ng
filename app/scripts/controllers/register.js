'use strict';

/**
 * @ngdoc function
 * @name parkattackgithubioApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the parkattackgithubioApp
 */
angular.module('parkattackgithubioApp')
  .controller('RegisterCtrl', function ($scope, $rootScope, $location, $routeParams, Auth, User, ProperNounFormatter) {
    $scope.debug = $rootScope.debug;
    if ($routeParams.email) {
      $scope.user = {
        email: $routeParams.email
      };
      // assume everything after the @ and before the first dot is the company name
      var domain = $scope.user.email.replace(/[^@]+@([^.]*).*/, '$1');
      if(['yahoo', 'gmail', 'hotmail'].indexOf(domain.toLowerCase()) < 0) {
        $scope.user.company = ProperNounFormatter.spacify(domain, true);
      }
      // assume everything before the @ is the name
      var name = $scope.user.email.replace(/([^@]*)@.*/, '$1');
      $scope.user.name = ProperNounFormatter.spacify(name);
    }
    $scope.go = function () {
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
          $location.path('/');
        }).catch(function(error) {
          $scope.error = error;
        });
      }).catch(function(error) {
        $scope.error = error;
      });
    };
  });
