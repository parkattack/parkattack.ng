'use strict';

/**
 * @ngdoc service
 * @name parkAttackWebApp.Auth
 * @description
 * # Auth
 * Factory in the parkAttackWebApp.
 */

// http://stackoverflow.com/a/30669858/68115
angular.module('parkAttackWebApp')
  .constant('FIREBASE_URL', 'https://parkattack.firebaseio.com/');

angular.module('parkAttackWebApp')
  .factory('Ref', function (FIREBASE_URL) {
    return new Firebase(FIREBASE_URL);
  });

angular.module('parkAttackWebApp')
  .factory('Auth', function ($firebaseAuth, $rootScope, Ref) {
    return $firebaseAuth(Ref);
  });

angular.module('parkAttackWebApp')
  .factory('StepChallenge', function ($firebaseArray, Ref) {
    return {
      get: function(id) {
        return $firebaseArray(Ref.child('StepChallenge').child(id));
      },
      add: function(id, item) {
        Ref.child('StepChallenge').child(id).set(item);
        return $firebaseArray(Ref.child('StepChallenge').child(id));
      }
    };
  });

angular.module('parkAttackWebApp')
  .factory('Users', function ($firebaseArray, Ref) {
    return $firebaseArray(Ref.child('Users'));
  });

angular.module('parkAttackWebApp')
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
