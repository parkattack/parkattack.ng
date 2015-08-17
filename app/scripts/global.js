'use strict';

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