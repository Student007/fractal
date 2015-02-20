//public/src/js/filters/ellipsis.js

angular.module('goals').filter('ellipsis', function() {
    return function (input, length) {
        if (input && input.length > length) {
            return input.substring(0, length) + '...';  
        } else {
            return input;
        }
    };
});