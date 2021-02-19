/**
 * Widget Header Directive
 */

angular
    .module('eduApp')
    .directive('rdWidgetHeader', rdWidgetTitle);

function rdWidgetTitle() {
    var directive = {
        requires: '^rdWidget',
        scope: {
            title: '@',
            icon: '@'
        },
        transclude: true,
        template: '<div class="widget-header clearfix"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div class="pull-right" ng-transclude></div></div>',
        restrict: 'E'
    };
    return directive;
};