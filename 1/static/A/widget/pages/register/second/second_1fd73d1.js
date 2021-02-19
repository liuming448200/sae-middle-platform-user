define('A:widget/pages/register/second/second', function(require, exports, module) {

  require('A:widget/pages/register/second/checkMobileVerifyCodeService');
  
  module.exports = {
    url: '/second?mobile',
    template: "<!--\r\n    @require \"A:widget/pages/register/second/second.css\"\r\n-->\r\n\r\n<div class=\"second-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ui-sref=\"register.first\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">用户注册</div>\r\n  </header>\r\n  <div class=\"container\">\r\n  \t<div class=\"content-container\">\r\n      <div class=\"tips\">\r\n        <h1>\r\n          已将短信验证码发送至手机号\r\n        </h1>\r\n        <h2>\r\n          {{mobile}}\r\n        </h2>\r\n      </div>\r\n  \t\t<form class=\"form-horizontal\" role=\"form\" name=\"checkVerifyCodeForm\" novalidate ng-submit=\"checkVerifyCodeSubmit()\">\r\n        <div class=\"form-group\">\r\n          <div class=\"col-sm-12\">\r\n            <table>\r\n              <td>\r\n                <input type=\"text\" class=\"form-control\" name=\"verifyCode\" ng-model=\"verifyCode\" ng-trim=\"true\" required ng-minlength=\"6\" ng-maxlength=\"6\" placeholder=\"请输入验证码\">\r\n              </td>\r\n              <td class=\"verifycode\">\r\n                <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"sendVerifyCode()\" ng-disabled=\"sendDisabled\">\r\n                  <span ng-hide=\"sendDisabled\">发送验证码</span>\r\n                  <span ng-show=\"sendDisabled\"><i>{{countdown}}</i>s重新发送</span>\r\n                </button>\r\n              </td>\r\n            </table>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <div class=\"col-sm-12\" style=\"text-align: center;\">\r\n            <a href=\"javascript:;\">\r\n              <button type=\"submit\" class=\"btn btn-success\">下一步</button>\r\n            </a>\r\n          </div>\r\n        </div>\r\n      </form>\r\n  \t</div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/register/second/second.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
