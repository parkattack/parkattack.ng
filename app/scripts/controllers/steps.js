'use strict';

/**
 * @ngdoc function
 * @name parkAttackWebApp.controller:StepsCtrl
 * @description
 * # StepsCtrl
 * Controller of the parkAttackWebApp
 */
angular.module('parkAttackWebApp')
  .controller('StepsCtrl', function ($scope, Users) {
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
    $scope.attending = Users;
  });
