define('A:widget/pages/login/login', function(require, exports, module) {

  module.exports = {
    url: '/login?from',
    template: "<!--\r\n    @require \"A:widget/pages/login/login.css\"\r\n-->\r\n\r\n<div class=\"login-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ng-click=\"back()\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">登录</div>\r\n  </header>\r\n  <div class=\"container\">\r\n  \t<div class=\"content-container\">\r\n  \t\t<form class=\"form-horizontal\" role=\"form\" name=\"loginForm\" novalidate ng-submit=\"loginSubmit()\">\r\n        <div class=\"form-group\">\r\n          <div class=\"col-sm-12\">\r\n             <input type=\"text\" class=\"form-control\" id=\"username\" name=\"username\" ng-model=\"username\" ng-trim=\"true\" required placeholder=\"请输入手机号/用户名\">\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <div class=\"col-sm-12\">\r\n             <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" ng-model=\"password\" ng-trim=\"true\" required ng-minlength=\"6\" ng-maxlength=\"16\" placeholder=\"请输入登录密码\">\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <div class=\"col-sm-12\" style=\"text-align: center;\">\r\n            <button type=\"submit\" class=\"btn btn-success\">登录</button>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <div class=\"col-sm-12\" style=\"text-align: center;\">\r\n          \t<a ui-sref=\"register\">\r\n            \t<button type=\"button\" class=\"btn btn-success\">还没有账号？免费注册</button>\r\n            </a>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <div class=\"col-sm-12\" style=\"text-align: right;\">\r\n          \t<a ui-sref=\"reset\">\r\n            \t<button type=\"button\" class=\"btn btn-link\" style=\"text-align: right; color: #000000;\">找回密码</button>\r\n            </a>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group thirdAuth\" ng-show=\"\">\r\n        \t<div class=\"col-sm-12\">\r\n            <table>\r\n            \t<td>\r\n            \t\t<i class=\"line\"></i>\r\n            \t</td>\r\n            \t<td>\r\n            \t\t使用第三方账号登录\r\n            \t</td>\r\n            \t<td>\r\n            \t\t<i class=\"line\"></i>\r\n            \t</td>\r\n            </table>\r\n            <button type=\"button\" class=\"btn btn-success\">QQ登录</button>\r\n          </div>\r\n        </div>\r\n      </form>\r\n  \t</div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/login/login.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});