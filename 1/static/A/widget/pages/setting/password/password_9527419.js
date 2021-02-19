define('A:widget/pages/setting/password/password', function(require, exports, module) {

  module.exports = {
    url: '/password',
    template: "<!--\r\n    @require \"A:widget/pages/setting/password/password.css\"\r\n-->\r\n\r\n<div class=\"password-container\">\r\n  <header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ui-sref=\"setting.all\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">修改密码</div>\r\n  </header>\r\n  <div class=\"container\">\r\n    <div class=\"content-container\">\r\n      <div class=\"well\">\r\n        <form class=\"form-horizontal\" role=\"form\" name=\"changePasswordForm\" novalidate ng-submit=\"changePasswordSubmit()\">\r\n          <div class=\"form-group\">\r\n            <label for=\"oldpassword\" class=\"col-sm-2 control-label\">当前密码</label>\r\n            <div class=\"col-sm-10\">\r\n              <input type=\"password\" class=\"form-control\" id=\"oldpassword\" name=\"oldpassword\" ng-model=\"oldpassword\" ng-trim=\"true\" required ng-minlength=\"6\" ng-maxlength=\"16\" placeholder=\"请输入当前密码\">\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"newpassword\" class=\"col-sm-2 control-label\">新密码</label>\r\n            <div class=\"col-sm-10\">\r\n              <input type=\"password\" class=\"form-control\" id=\"newpassword\" name=\"newpassword\" ng-model=\"newpassword\" ng-trim=\"true\" required ng-minlength=\"6\" ng-maxlength=\"16\" placeholder=\"请输入新密码\">\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"password\" class=\"col-sm-2 control-label\">新密码</label>\r\n            <div class=\"col-sm-10\">\r\n               <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" ng-model=\"password\" ng-trim=\"true\" required ng-minlength=\"6\" ng-maxlength=\"16\" placeholder=\"请再次输入新密码\">\r\n            </div>\r\n          </div>\r\n          <span class=\"help-block\">1、为了您的账号安全，新旧密码必须不同；</span>\r\n          <span class=\"help-block\">2、请输入6-16位字符，可填数字、字母和符号。</span>\r\n          <div class=\"form-group\">\r\n            <div class=\"col-sm-offset-2 col-sm-10\" style=\"text-align: center;\">\r\n               <button type=\"submit\" class=\"btn btn-success\">提交</button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
      require.async(['A:widget/pages/setting/password/password.async'], function(ctrl) {
        $injector.invoke(ctrl, this, {'$scope': $scope});
      });
    }]
  };
  

});
