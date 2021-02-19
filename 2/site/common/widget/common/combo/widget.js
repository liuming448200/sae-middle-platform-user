/**
 * Widget Directive
 */

require('./widget-header.js');
require('./widget-body.js');
require('./widget-footer.js');
require('./loading.js');
require('./load-fail.js');
require('./load-empty.js');

angular
    .module('eduApp')
    .directive('rdWidget', rdWidget);

function rdWidget() {
    var directive = {
        transclude: true,
        template: '<div class="widget" ng-transclude></div>',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        /* */
    }
};