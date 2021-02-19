define('A:widget/pages/imgcrop/imgcrop', function(require, exports, module) {

  require('A:widget/pages/imgcrop/imgService');
  
  module.exports = {
    url: '/imgcrop?from&source',
    template: "<!--\r\n    @require \"A:widget/pages/imgcrop/imgcrop.css\"\r\n-->\r\n\r\n<div class=\"imgcrop-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ng-click=\"back()\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <a class=\"header-btn header-pos-right\" href=\"javascript:;\" ng-click=\"save()\">\r\n      <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i>\r\n    </a>\r\n    <div class=\"title\">图片裁切</div>\r\n  </header>\r\n  <div class=\"container\">\r\n  \t<div class=\"cropArea\">\r\n\t    <img-crop image=\"myImage\" result-image=\"myCroppedImage\" result-image-format=\"image/jpeg\"></img-crop>\r\n\t  </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/imgcrop/imgcrop.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
