'use strict';

/**
 * @ngdoc service
 * @name parkattackgithubioApp.ProperNounFormatter
 * @description
 * # ProperNounFormatter
 * Service in the parkattackgithubioApp.
 */
angular.module('parkattackgithubioApp')
  .service('ProperNounFormatter', function () {
    return {
      spacify: function(text, useSingleLetterSmarts) {
        if (text.indexOf('.') > 0 || text.indexOf('_') > 0 || text.indexOf('-') > 0) {
          // if text contains dots, hyphens or underscores, split and capitalise
          text = text.split(/[\._\-]/).map(function(t) { return t.charAt(0).toUpperCase() + t.slice(1); }).join(' ');
        } else if (/[A-Z]/.test(text)) {
          // if text contains capital letters, split
          if(useSingleLetterSmarts){
            // good for company names
            
            // http://stackoverflow.com/a/1098039/68115 (doesnt work for js because of unsupported positive lookbehind assertion)
            //text = text.replace(/((?<=\p{Ll})\p{Lu}|\p{Lu}(?=\p{Ll}))/, '$1').trim();

            // http://stackoverflow.com/a/5582404/68115
            text = text.replace(/([a-z])([A-Z])/g, '$1 $2');
          } else {
            // good for human names
            text = text.replace(/^[a-z]|[A-Z]/g, function(c, i) { return i === 0 ? c : " " + c; });
          }
        }
        return text;
      }
    };
  });
