define('A:widget/pages/register/third/third', function(require, exports, module) {

  module.exports = {
    url: '/third?mobile',
    template: "<!--\r\n    @require \"A:widget/pages/register/third/third.css\"\r\n-->\r\n\r\n<div class=\"third-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ui-sref=\"register.second\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">用户注册</div>\r\n  </header>\r\n  <div class=\"container\">\r\n  \t<div class=\"content-container\">\r\n  \t\t<form class=\"form-horizontal\" role=\"form\" name=\"registerForm\" novalidate ng-submit=\"registerSubmit()\">\r\n        <div class=\"form-group\">\r\n          <label for=\"username\" class=\"col-sm-2 control-label\">设置用户名</label>\r\n          <div class=\"col-sm-10\">\r\n             <input type=\"text\" class=\"form-control\" id=\"username\" name=\"username\" ng-model=\"username\" ng-trim=\"true\" required ng-minlength=\"6\" ng-maxlength=\"16\" placeholder=\"请设置用户名\">\r\n             <p class=\"help-block\">6~16位字符，可填数字、字母、符号和汉字，注册后不能修改</p>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"password\" class=\"col-sm-2 control-label\">设置密码</label>\r\n          <div class=\"col-sm-10\">\r\n             <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" ng-model=\"password\" ng-trim=\"true\" required ng-minlength=\"6\" ng-maxlength=\"16\" placeholder=\"请设置密码\">\r\n             <p class=\"help-block\">6~16位字符，可填数字、字母和符号</p>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <div class=\"col-sm-offset-2 col-sm-10\" style=\"text-align: center;\">\r\n            <button type=\"submit\" class=\"btn btn-success\">提交</button>\r\n          </div>\r\n        </div>\r\n      </form>\r\n  \t</div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/register/third/third.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
