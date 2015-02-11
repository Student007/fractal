// public/js/services/UtilityService.js
angular.module('goals').factory('UtilityService', function() {
    return {
        range : function(n) {
            console.log(n);
            if (n) {
                return new Array(n);
            } else {
                return new Array(0);
            }
        }
    };       
});