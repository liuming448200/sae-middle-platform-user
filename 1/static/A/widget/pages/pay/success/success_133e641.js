define('A:widget/pages/pay/success/success', function(require, exports, module) {

  module.exports = {
  	url: '/success',
  	template: "<!--\r\n    @require \"A:widget/pages/pay/success/success.css\"\r\n-->\r\n\r\n<div class=\"success-container\">\r\n  <div class=\"tips-outer\">\r\n    <img class=\"img-responsive\" src=\"/static/A/images/success_fa0aac2.png\">\r\n    <h3 class=\"h3\">支付成功</h3>\r\n  </div>\r\n  <p>\r\n    <button type=\"button\" class=\"btn btn-success btn-lg btn-block\" ng-click=\"goCourse()\" ng-show=\"'instmore.product' === urlParams.from\">预约课程</button>\r\n    <button type=\"button\" class=\"btn btn-success btn-lg btn-block\" ng-click=\"goActivity()\" ng-show=\"'activity' === urlParams.from\">参加更多活动</button>\r\n    <a ui-sref=\"myorder.course.detail\" ng-show=\"'instmore.product' === urlParams.from\">\r\n      <button type=\"button\" class=\"btn btn-info btn-lg btn-block\">查看订单</button>\r\n    </a>\r\n    <a ui-sref=\"myorder.activity.detail\" ng-show=\"'activity' === urlParams.from\">\r\n      <button type=\"button\" class=\"btn btn-info btn-lg btn-block\">查看订单</button>\r\n    </a>\r\n  </p>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
      require.async(['A:widget/pages/pay/success/success.async'], function(ctrl) {
        $injector.invoke(ctrl, this, {'$scope': $scope});
      });
    }]
  };
  

});
