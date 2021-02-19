define('A:widget/pages/setting/phone/current/current', function(require, exports, module) {

  module.exports = {
    url: '/current',
    template: "<!--\r\n    @require \"A:widget/pages/setting/phone/current/current.css\"\r\n-->\r\n\r\n<div class=\"current-container\">\r\n  <header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ui-sref=\"setting.all\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">手机号码</div>\r\n  </header>\r\n  <div class=\"container\">\r\n    <div class=\"content-container\">\r\n      <div class=\"well\">\r\n        <div class=\"phone-line\">\r\n          <span>手机号码</span>\r\n          <span>{{user.mobile}}</span>\r\n        </div>\r\n        <div class=\"next-line\">\r\n          <a href=\"javascript:;\" ui-sref=\"setting.phone.newphone\">\r\n            <button type=\"submit\" class=\"btn btn-success\">更换手机号码</button>\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$rootScope', 'globals', function ($rootScope, globals) {
    	$rootScope.pageTitle = '当前手机号码';
    	$rootScope.pageImage = globals.LOGO_IMAGE;
    }]
  };
  

});
