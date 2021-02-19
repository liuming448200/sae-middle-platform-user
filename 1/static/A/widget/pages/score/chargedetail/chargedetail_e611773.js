define('A:widget/pages/score/chargedetail/chargedetail', function(require, exports, module) {

  module.exports = {
    url: '/chargedetail?from',
    template: "<!--\r\n    @require \"A:widget/pages/score/chargedetail/chargedetail.css\"\r\n-->\r\n\r\n<div class=\"chargedetail-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" ui-sref=\"score.availpoints({from:$stateParams.from})\">\r\n      <i class=\"fa fa-times\"></i>\r\n    </a>\r\n    <div class=\"title\">商品详情</div>\r\n  </header>\r\n  <div class=\"container\">\r\n  \t<div class=\"detail\">\r\n      <div class=\"outer\">\r\n    \t\t<div class=\"q-div\">\r\n    \t\t\t<img src=\"/static/A/images/default_0e3a6a2.jpg\">\r\n    \t\t\t<div class=\"q-con\">\r\n    \t\t\t\t<span class=\"q-name\">10元课时包券</span>\r\n    \t\t\t</div>\r\n    \t\t</div>\r\n    \t\t<div class=\"q-info\">\r\n    \t\t\t<span class=\"yelp\">50积分</span>\r\n    \t\t\t<!-- 黄色背景：class=\"yel\"  灰色背景：class=\"gray\" -->\r\n    \t\t\t<button class=\"yel btn-change\" ng-click=\"charge()\" ng-class=\"{gray:!!$stateParams.from}\" ng-disabled=\"!!$stateParams.from\">兑换</button>\r\n    \t\t</div>\r\n      </div>\r\n  \t</div>\r\n  \t<div class=\"pb2\">\r\n  \t\t<dl class=\"quan-details\">\r\n  \t\t\t<dt>使用说明</dt>\r\n  \t\t\t<dd>\r\n  \t\t\t\t有效期：领取日起1个月内有效<br>\r\n  \t\t\t\t使用条件：无订单金额使用限制，限领取人手机号使用\r\n  \t\t\t</dd>\r\n  \t\t</dl>\r\n  \t\t<dl class=\"quan-details\">\r\n  \t\t\t<dt>注意事项</dt>\r\n  \t\t\t<dd>\r\n  \t\t\t\t1.优惠券请在有效期内使用，代金券不可兑换、找零、开具发票、转让；<br>\r\n  \t\t\t\t2.已兑换商品的对应积分不可退回；<br>\r\n  \t\t\t\t3.积分兑换记录可在积分明细中查询；<br>\r\n  \t\t\t\t4.兑换成功后，可在兑换记录中查询，或在神州专车平台“我的钱包”中查看。\r\n  \t\t\t</dd>\r\n  \t\t</dl>\r\n  \t</div>\r\n  \t<div class=\"imp-notice\">\r\n  \t\t<p>兑换商品前，请仔细阅读商品详情页面的“使用说明”及“注意事项”等相关内容。商品一经兑换，概不退还积分，请您理解。活动由神州租车提供，与设备生产商Apple Inc.公司无关。</p>\r\n  \t\t<span class=\"imp-title\">重要说明</span>\r\n  \t</div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/score/chargedetail/chargedetail.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
