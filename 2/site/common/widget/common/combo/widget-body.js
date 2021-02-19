/**
 * Widget Body Directive
 */

angular
    .module('eduApp')
    .directive('rdWidgetBody', rdWidgetBody);

function rdWidgetBody() {
    var directive = {
        requires: '^rdWidget',
        scope: {
            loading: '=',
            failing: '=',
            empty: '=',
            classes: '@?'
        },
        transclude: true,
        template: '<div class="widget-body" ng-class="classes">' +
                    '<rd-loading ng-show="loading"></rd-loading>' +
                    '<rd-load-fail ng-show="failing"></rd-load-fail>' +
                    '<rd-load-empty ng-show="empty"></rd-load-empty>' +
                    '<div ng-hide="loading || failing || empty" class="widget-content" ng-transclude>' +
                    '</div>' +
                    '</div>',
        restrict: 'E'
    };
    return directive;
};