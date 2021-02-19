angular
  .module('eduApp')
  .directive('rdLoadFail', rdLoadFail);

function rdLoadFail() {
    var directive = {
        restrict: 'AE',
        template: '<div class="load-fail">加载失败，请检查网络连接...</div>'
    };
    return directive;
};
