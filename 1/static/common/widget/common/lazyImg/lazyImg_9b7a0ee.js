define('common:widget/common/lazyImg/lazyImg', function(require, exports, module) {

  angular
  	.module('eduApp')
  	.directive('lazyImg', lazyImg);
  
  function lazyImg () {
  	 return {
      restrict: 'A',
      scope: true,
      link: function(scope, elem, attrs) {
        scope.displayImage = function() {
          elem[0].setAttribute('src', attrs.lazyImg);
        };
      }
    };
  }
  

});
