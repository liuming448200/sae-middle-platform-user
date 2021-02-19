define('A:widget/pages/myorder/course/detail/detail', function(require, exports, module) {

  module.exports = {
    url: '/detail',
    template: "<!--\r\n    @require \"A:widget/pages/myorder/course/detail/detail.css\"\r\n-->\r\n\r\n<div class=\"detail-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" ui-sref=\"myorder.course.list\">\r\n      <i class=\"fa fa-times\"></i>\r\n    </a>\r\n    <div class=\"title\">课程订单详情</div>\r\n  </header>\r\n  <div class=\"container\">\r\n  \t<div class=\"order-status\">\r\n  \t\t<div class=\"unpay\">\r\n\t  \t\t<h3 class=\"h3\">等待支付</h3>\r\n        <h4 class=\"h4\">\r\n          <span>金额：<i class=\"fa fa-jpy\" aria-hidden=\"true\"></i><strong class=\"price\">12300</strong></span>\r\n        </h4>\r\n        <p class=\"help-block\">逾期未支付，订单将自动取消</p>\r\n\t  \t\t<button class=\"btn btn-danger\" ng-click=\"goPay()\">继续支付</button>\r\n        <button class=\"btn btn-default\" ng-click=\"cancel()\">取消订单</button>\r\n  \t\t</div>\r\n      <div class=\"pay-status\" ng-show=\"\">\r\n        <img class=\"img-responsive\" src=\"/static/A/images/success_fa0aac2.png\">\r\n        <h4 class=\"h4\">服务中</h4>\r\n      </div>\r\n  \t</div>\r\n  \t<div class=\"pay-info\">\r\n      <div class=\"outer\">\r\n        <div class=\"pay-item\">\r\n          <h2>请选择支付方式：</h2>\r\n        </div>\r\n        <a href=\"javascript:;\" class=\"pay-item reset-item\" ng-click=\"weixinPay()\" ng-show=\"upHasWeixin\">\r\n          <div class=\"clearfix\">\r\n            <div class=\"img-common img-weixin pull-left\"></div>\r\n            <div class=\"img-common pull-right\" ng-class=\"selectWeixin?'img-selected':'img-unselected'\"></div>\r\n            <h1 class=\"pay-text\">微信支付</h1>\r\n          </div>\r\n        </a>\r\n        <a href=\"javascript:;\" class=\"pay-item reset-item\" ng-click=\"Alipay()\" ng-show=\"upHasAlipay\">\r\n          <div class=\"clearfix\">\r\n            <div class=\"img-common img-alipay pull-left\"></div>\r\n            <div class=\"img-common pull-right\" ng-class=\"selectAlipay?'img-selected':'img-unselected'\"></div>\r\n            <h1 class=\"pay-text\">支付宝</h1>\r\n          </div>\r\n        </a>\r\n        <a href=\"javascript:;\" class=\"reset-item collapsed\" data-toggle=\"collapse\" data-target=\"#collapseOne\" ng-show=\"showMore\">\r\n          <div class=\"more clearfix\">\r\n            <div class=\"img-common img-more pull-left\"></div>\r\n            <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n            <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i>\r\n            <h1 class=\"pay-text\">更多</h1>\r\n          </div>\r\n        </a>\r\n        <div id=\"collapseOne\" class=\"collapse\">\r\n          <a href=\"javascript:;\" class=\"reset-item\" ng-click=\"weixinPay()\" ng-show=\"downHasWeixin\">\r\n            <div class=\"clearfix\">\r\n              <div class=\"img-common img-weixin pull-left\"></div>\r\n              <div class=\"img-common pull-right\" ng-class=\"selectWeixin?'img-selected':'img-unselected'\"></div>\r\n              <h1 class=\"pay-text\">微信支付</h1>\r\n            </div>\r\n          </a>\r\n          <a href=\"javascript:;\" class=\"reset-item\" ng-click=\"Alipay()\" ng-show=\"downHasAlipay\">\r\n            <div class=\"clearfix\">\r\n              <div class=\"img-common img-alipay pull-left\"></div>\r\n              <div class=\"img-common pull-right\" ng-class=\"selectAlipay?'img-selected':'img-unselected'\"></div>\r\n              <h1 class=\"pay-text\">支付宝</h1>\r\n            </div>\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  \t<div class=\"order-info\">\r\n      <ul>\r\n        <li class=\"list-group-item\">\r\n          纽约国际儿童俱乐部西红门鸿坤中心\r\n        </li>\r\n        <li class=\"list-group-item\">\r\n          课程：早教36课时包\r\n        </li>\r\n        <li class=\"list-group-item\">\r\n          有效期：2017-05-20 至 2018-05-19\r\n        </li>\r\n      </ul>\r\n  \t</div>\r\n  \t<div class=\"order-extra\">\r\n  \t\t<ul>\r\n        <li class=\"list-group-item\">\r\n          订单编号：1234567890123456789\r\n        </li>\r\n        <li class=\"list-group-item\">\r\n          下单时间：2017-06-19 09:50:48\r\n        </li>\r\n      </ul>\r\n  \t</div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/myorder/course/detail/detail.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
