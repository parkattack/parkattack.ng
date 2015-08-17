'use strict';

angular.module('ui.gravatar').config([
  'gravatarServiceProvider',
  function(gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      size     : 40,
      //"default": 'identicon',
      "default": 'monsterid'
    };
  }
]);
