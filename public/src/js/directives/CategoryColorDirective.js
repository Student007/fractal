// public/js/controllers/CategoryColorDirective.js

angular.module('goals').directive('categoryColorSelector', function($compile, catColors) {
    console.log(catColors);
    return {
        restrict: 'AE',
        scope: {
            ngModel: '=',
        },
        templateUrl: '../../views/category-color-selector.html',
        require: 'ngModel',
        link: function($scope, elem, attr, ctrl) {
            $scope.catColors = catColors;

            $scope.colorSelect = function(color) {
                $scope.ngModel = color;
                ctrl.$setDirty();
            };
        }
    };
});