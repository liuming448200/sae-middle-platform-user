define('common:widget/common/combo/toast', function(require, exports, module) {

  /**
   * @require common:widget/common/combo/widget.less
   */
  
  angular
    .module('eduApp')
    .directive('rdToast', rdToast);
  
  function rdToast () {
  	var directive = {
  		scope: {
          toast: '='
      },
      template: '<div class="toast"><span class="msg" ng-bind="toast" ng-if="toast"></span></div>',
      restrict: 'E'
  	};
  	return directive;
  }
  

});
