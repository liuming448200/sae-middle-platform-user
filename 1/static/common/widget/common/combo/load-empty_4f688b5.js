define('common:widget/common/combo/load-empty', function(require, exports, module) {

  angular
    .module('eduApp')
    .directive('rdLoadEmpty', rdLoadEmpty);
  
  function rdLoadEmpty() {
      var directive = {
          restrict: 'AE',
          template: '<div class="load-empty">暂无数据</div>'
      };
      return directive;
  };
  

});
