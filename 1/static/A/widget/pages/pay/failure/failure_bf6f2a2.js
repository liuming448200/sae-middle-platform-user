define('A:widget/pages/pay/failure/failure', function(require, exports, module) {

  module.exports = {
  	url: '/failure',
  	template: "<!--\r\n    @require \"A:widget/pages/pay/failure/failure.css\"\r\n-->\r\n\r\n<div class=\"failure-container\">\r\n  <div class=\"tips-outer\">\r\n    <img class=\"img-responsive\" src=\"/static/A/images/notice_ae70474.png\">\r\n    <h3 class=\"h3\">支付失败</h3>\r\n  </div>\r\n  <p>\r\n    <a ui-sref=\"myorder.course.detail\" ng-show=\"'instmore.product' === urlParams.from\">\r\n      <button type=\"button\" class=\"btn btn-info btn-lg btn-block\">查看订单</button>\r\n    </a>\r\n    <a ui-sref=\"myorder.activity.detail\" ng-show=\"'activity' === urlParams.from\">\r\n      <button type=\"button\" class=\"btn btn-info btn-lg btn-block\">查看订单</button>\r\n    </a>\r\n  </p>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
      require.async(['A:widget/pages/pay/failure/failure.async'], function(ctrl) {
        $injector.invoke(ctrl, this, {'$scope': $scope});
      });
    }]
  };
  

});
