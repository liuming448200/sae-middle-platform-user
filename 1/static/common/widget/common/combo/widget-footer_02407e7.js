define('common:widget/common/combo/widget-footer', function(require, exports, module) {

  /**
   * Widget Footer Directive
   */
  
  angular
      .module('eduApp')
      .directive('rdWidgetFooter', rdWidgetFooter);
  
  function rdWidgetFooter() {
      var directive = {
          requires: '^rdWidget',
          transclude: true,
          template: '<div class="widget-footer" ng-transclude></div>',
          restrict: 'E'
      };
      return directive;
  };

});
