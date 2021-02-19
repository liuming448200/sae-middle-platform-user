define('A:widget/pages/setting/phone/newphone/newphone', function(require, exports, module) {

  module.exports = {
    url: '/newphone',
    template: "<!--\r\n    @require \"A:widget/pages/setting/phone/newphone/newphone.css\"\r\n-->\r\n\r\n<div class=\"newphone-container\">\r\n  <header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ui-sref=\"setting.phone.current\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">绑定手机</div>\r\n  </header>\r\n  <div class=\"container\">\r\n    <div class=\"content-container\">\r\n      <div class=\"well\">\r\n        <form class=\"form-horizontal\" role=\"form\" name=\"checkMobileForm\" novalidate ng-submit=\"checkMobileSubmit()\">\r\n          <div class=\"form-group\">\r\n            <label for=\"mobile\" class=\"col-sm-2 control-label\">手机号码</label>\r\n            <div class=\"col-sm-10\">\r\n               <input type=\"text\" class=\"form-control\" id=\"mobile\" name=\"mobile\" ng-model=\"mobile\" ng-trim=\"true\" required ng-minlength=\"11\" ng-maxlength=\"11\" placeholder=\"请输入新手机号码\">\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <div class=\"col-sm-offset-2 col-sm-10\" style=\"text-align: center;\">\r\n              <button type=\"submit\" class=\"btn btn-success\">下一步</button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
      require.async(['A:widget/pages/setting/phone/newphone/newphone.async'], function(ctrl) {
        $injector.invoke(ctrl, this, {'$scope': $scope});
      });
    }]
  };
  

});
