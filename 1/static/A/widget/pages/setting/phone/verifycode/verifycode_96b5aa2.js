define('A:widget/pages/setting/phone/verifycode/verifycode', function(require, exports, module) {

  module.exports = {
    url: '/verifycode?mobile',
    template: "<!--\r\n    @require \"A:widget/pages/setting/phone/verifycode/verifycode.css\"\r\n-->\r\n\r\n<div class=\"verifycode-container\">\r\n  <header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ui-sref=\"setting.phone.newphone\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">绑定手机</div>\r\n  </header>\r\n  <div class=\"container\">\r\n    <div class=\"content-container\">\r\n      <div class=\"well\">\r\n        <span class=\"help-block\">请输入<i>{{mobile}}</i>收到的短信校验码</span>\r\n        <form class=\"form-horizontal\" role=\"form\" name=\"checkVerifyCodeForm\" novalidate ng-submit=\"checkVerifyCodeSubmit()\">\r\n          <div class=\"form-group\">\r\n            <div class=\"col-sm-12\">\r\n              <input type=\"text\" class=\"form-control\" name=\"verifyCode\" ng-model=\"verifyCode\" ng-trim=\"true\" required ng-minlength=\"6\" ng-maxlength=\"6\" placeholder=\"请输入短信校验码\">\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <div class=\"col-sm-12\" style=\"text-align: center;\">\r\n              <button type=\"submit\" class=\"btn btn-success\">确定</button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
      require.async(['A:widget/pages/setting/phone/verifycode/verifycode.async'], function(ctrl) {
        $injector.invoke(ctrl, this, {'$scope': $scope});
      });
    }]
  };
  

});
