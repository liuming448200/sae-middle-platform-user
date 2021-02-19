/**
 * @require widget.less
 */

angular
  .module('eduApp')
  .directive('rdWaiting', rdWaiting);

function rdWaiting () {
	var directive = {
    restrict: 'AE',
    template: '<div class="waiting-container"><div class="waiting"><div class="waiting-inner-container"><div><i class="fa fa-spinner fa-pulse"></i></div><div>提交中...</div></div></div></div>'
  };
  return directive;
}
