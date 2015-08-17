'use strict';


function shuffle(array) {
  var counter = array.length, temp, index;
  while (counter > 0) {
    index = Math.floor(Math.random() * counter);
    counter--;
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
    
angular.module('parkAttackWebApp')
  .run(function ($rootScope, $location, Auth, User) {
    $rootScope.auth = Auth;
    $rootScope.auth.$onAuth(function(authData) {
      $rootScope.authData = authData;
      if (authData && authData.uid) {
        $rootScope.user = User.get(authData.uid);
      }
    });
    $rootScope.debug = ($location.host() === 'localhost');
  });