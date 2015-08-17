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

    $scope.prizes = shuffle([
      {
        name: "Fame"
      },
      {
        name: "Glory"
      },
      {
        name: "Adulation"
      }
    ]);

    $scope.attending = [
      {
        name: "Ryan",
        email: "ryanbuckle@capesuk.com"
      }, {
        name: "Alice",
        email: "alice@capesuk.com"
      }, {
        name: "Lee",
        email: "lee@purplemotion.co.uk"
      }, {
        name: "Paul",
        email: "ceo@plymouthdrakefoundation.co.uk"
      }, {
        name: "Alex",
        email: "acresswell@stackoverflow.com"
      }, {
        name: "Rob",
        email: "rthijssen@gmail.com"
      }
    ];
  });
