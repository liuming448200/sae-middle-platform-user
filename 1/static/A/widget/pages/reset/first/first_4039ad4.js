define('A:widget/pages/reset/first/first', function(require, exports, module) {

  module.exports = {
    url: '/first',
    template: "<!--\r\n    @require \"A:widget/pages/reset/first/first.css\"\r\n-->\r\n\r\n<div class=\"first-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ui-sref=\"login\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">重置密码</div>\r\n  </header>\r\n  <div class=\"container\">\r\n  \t<div class=\"content-container\">\r\n  \t\t<form class=\"form-horizontal\" role=\"form\" name=\"checkMobileForm\" novalidate ng-submit=\"checkMobileSubmit()\">\r\n        <div class=\"form-group\">\r\n          <div class=\"col-sm-12\">\r\n             <input type=\"text\" class=\"form-control\" id=\"mobile\" name=\"mobile\" ng-model=\"mobile\" ng-trim=\"true\" required ng-minlength=\"11\" ng-maxlength=\"11\" placeholder=\"请输入手机号码\">\r\n          </div>\r\n        </div>\r\n        <!-- <div class=\"form-group\">\r\n          <div class=\"col-sm-12\">\r\n            <table>\r\n              <td>\r\n                <input type=\"text\" class=\"form-control\" name=\"verifyCode\" ng-model=\"verifyCode\" ng-trim=\"true\" required ng-minlength=\"5\" ng-maxlength=\"5\" placeholder=\"请输入验证码\">\r\n              </td>\r\n              <td class=\"verifycode\">\r\n                  <img ng-src=\"{{vcodeUrl}}\" ng-click=\"sendVerifyCode()\">\r\n              </td>\r\n            </table>\r\n          </div>\r\n        </div> -->\r\n        <div class=\"form-group\">\r\n          <div class=\"col-sm-12\" style=\"text-align: center;\">\r\n            <button type=\"submit\" class=\"btn btn-success\">下一步</button>\r\n          </div>\r\n        </div>\r\n      </form>\r\n  \t</div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/reset/first/first.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
