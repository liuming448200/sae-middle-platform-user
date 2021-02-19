define('A:widget/pages/setting/suggestion/suggestion', function(require, exports, module) {

  module.exports = {
    url: '/suggestion',
    template: "<!--\r\n    @require \"A:widget/pages/setting/suggestion/suggestion.css\"\r\n-->\r\n\r\n<div class=\"suggestion-container\">\r\n  <header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ui-sref=\"setting.all\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">意见反馈</div>\r\n  </header>\r\n  <div class=\"container\">\r\n    <div class=\"content-container\">\r\n      <div class=\"well\">\r\n        <form class=\"form-horizontal\" role=\"form\" name=\"suggestionForm\" novalidate ng-submit=\"suggestionSubmit()\">\r\n          <div class=\"form-group\">\r\n            <label for=\"content\" class=\"col-sm-2 control-label\">建议内容</label>\r\n            <div class=\"col-sm-10\">\r\n               <textarea class=\"form-control\" rows=\"3\" id=\"content\" name=\"content\" ng-model=\"content\" ng-trim=\"true\" required ng-maxlength=\"1000\" placeholder=\"请输入意见建议\"></textarea>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"contact\" class=\"col-sm-2 control-label\">联系方式</label>\r\n            <div class=\"col-sm-10\">\r\n               <input type=\"text\" class=\"form-control\" id=\"contact\" name=\"contact\" ng-model=\"contact\" ng-trim=\"true\" required ng-maxlength=\"100\" placeholder=\"请输入您的联系方式\">\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <div class=\"col-sm-offset-2 col-sm-10\" style=\"text-align: center;\">\r\n               <button type=\"submit\" class=\"btn btn-success\">提交</button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
      require.async(['A:widget/pages/setting/suggestion/suggestion.async'], function(ctrl) {
        $injector.invoke(ctrl, this, {'$scope': $scope});
      });
    }]
  };
  

});
