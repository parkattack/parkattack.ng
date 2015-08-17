'use strict';

/**
 * @ngdoc function
 * @name parkAttackWebApp.controller:StepsCtrl
 * @description
 * # StepsCtrl
 * Controller of the parkAttackWebApp
 */
angular.module('parkAttackWebApp')
  .controller('StepsCtrl', function ($scope, $rootScope, StepChallenge, $firebaseArray, Ref) {
    $scope.go = function() {
      StepChallenge.add('test', [{
        user: $rootScope.authData.uid,
        date: $scope.newSteps.date,
        steps: $scope.newSteps.steps
      }]);
    };

    var stepsRef = Ref.child('StepChallenge');
    $scope.steps = $firebaseArray(stepsRef);

    var query = stepsRef.orderByChild("timestamp").limitToLast(25);
    $scope.filteredSteps = $firebaseArray(query);



  });
