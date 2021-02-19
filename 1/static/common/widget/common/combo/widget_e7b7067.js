define('common:widget/common/combo/widget', function(require, exports, module) {

  /**
   * Widget Directive
   */
  
  require('common:widget/common/combo/widget-header');
  require('common:widget/common/combo/widget-body');
  require('common:widget/common/combo/widget-footer');
  require('common:widget/common/combo/loading');
  require('common:widget/common/combo/load-fail');
  require('common:widget/common/combo/load-empty');
  
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

});
