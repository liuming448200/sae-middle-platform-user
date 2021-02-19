define('A:widget/pages/growth/growth', function(require, exports, module) {

  module.exports = {
    url: '/growth',
    template: "<!--\r\n    @require \"A:widget/pages/growth/growth.css\"\r\n-->\r\n\r\n<div class=\"growth-container\">\r\n  <header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ui-sref=\"main.user\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">成长档案</div>\r\n  </header>\r\n  <div class=\"container\">\r\n    <div class=\"content-container\">\r\n      老师负责记录每个孩子每次上课的情况\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/growth/growth.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
