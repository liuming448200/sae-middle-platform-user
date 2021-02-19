angular
  .module('eduApp')
  .directive('rdLoading', rdLoading);

function rdLoading() {
    var directive = {
        restrict: 'AE',
        template: '<div class="loading-container"><div class="loading"><div class="loading-inner-container"><div><i class="fa fa-spinner fa-pulse"></i></div><div>加载中...</div></div></div></div>'
    };
    return directive;
};