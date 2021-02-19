define('A:widget/pages/setting/aboutus/aboutus', function(require, exports, module) {

  module.exports = {
    url: '/aboutus',
    template: "<!--\r\n    @require \"A:widget/pages/setting/aboutus/aboutus.css\"\r\n-->\r\n\r\n<div class=\"aboutus-container\">\r\n  <header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ui-sref=\"setting.all\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">关于我们</div>\r\n  </header>\r\n  <div class=\"container\">\r\n    <div class=\"content-container\">\r\n      待完善\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$rootScope', 'globals', function ($rootScope, globals) {
    	$rootScope.pageTitle = '欢迎走进我们';
    	$rootScope.pageImage = globals.LOGO_IMAGE;
    }]
  };
  

});
