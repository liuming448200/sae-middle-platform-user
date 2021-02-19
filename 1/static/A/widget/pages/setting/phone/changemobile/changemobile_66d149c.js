define('A:widget/pages/setting/phone/changemobile/changemobile', function(require, exports, module) {

  module.exports = {
    url: '/changemobile?mobile',
    template: "<!--\r\n    @require \"A:widget/pages/setting/phone/changemobile/changemobile.css\"\r\n-->\r\n\r\n<div class=\"changemobile-container\">\r\n  <header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ui-sref=\"setting.phone.verifycode\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">绑定手机</div>\r\n  </header>\r\n  <div class=\"container\">\r\n    <div class=\"content-container\">\r\n      <form class=\"form-horizontal\" role=\"form\" name=\"changeMobileForm\" novalidate ng-submit=\"changeMobileSubmit()\">\r\n        <div class=\"form-group\">\r\n          <label for=\"mobile\" class=\"col-sm-2 control-label\">新手机号码</label>\r\n          <div class=\"col-sm-10\">\r\n             <input type=\"text\" class=\"form-control\" id=\"mobile\" name=\"mobile\" ng-model=\"mobile\" disabled>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <div class=\"col-sm-offset-2 col-sm-10\" style=\"text-align: center;\">\r\n            <button type=\"submit\" class=\"btn btn-success\">提交</button>\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
      require.async(['A:widget/pages/setting/phone/changemobile/changemobile.async'], function(ctrl) {
        $injector.invoke(ctrl, this, {'$scope': $scope});
      });
    }]
  };
  

});
