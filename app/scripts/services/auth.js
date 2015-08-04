'use strict';

/**
 * @ngdoc service
 * @name parkattackgithubioApp.Auth
 * @description
 * # Auth
 * Factory in the parkattackgithubioApp.
 */

// http://stackoverflow.com/a/30669858/68115
angular.module('parkattackgithubioApp')
  .constant('FIREBASE_URL', 'https://parkattack.firebaseio.com/');

angular.module('parkattackgithubioApp')
  .factory('Ref', function (FIREBASE_URL) {
    return new Firebase(FIREBASE_URL);
  });

angular.module('parkattackgithubioApp')
  .factory('Auth', function ($firebaseAuth, $rootScope, Ref) {
    return $firebaseAuth(Ref);
  });

angular.module('parkattackgithubioApp')
  .factory('Users', function ($firebaseArray, Ref) {
    return $firebaseArray(Ref.child('Users'));
  });

angular.module('parkattackgithubioApp')
  .factory('User', function ($firebaseObject, Ref) {
    return {
      get: function(id) {
        return $firebaseObject(Ref.child('Users').child(id));
      },
      add: function(id, user) {
        Ref.child('Users').child(id).set(user);
        return $firebaseObject(Ref.child('Users').child(id));
      }
    };
    /*
    return function(id) {
     return $firebaseObject(Ref.child('Users').child(id));
    };
    */
  });
