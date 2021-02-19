define('A:widget/pages/myorder/course/list/list', function(require, exports, module) {

  module.exports = {
    url: '/list',
    template: "<!--\r\n    @require \"A:widget/pages/myorder/course/list/list.css\"\r\n-->\r\n\r\n<div class=\"list-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" ui-sref=\"main.user\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">\r\n    \t<a href=\"javascript:;\" ng-click=\"toggle()\">\r\n\t    \t课程订单(7)\r\n\t    \t<i class=\"fa fa-angle-down\" aria-hidden=\"true\" ng-hide=\"toggleFlag\"></i>\r\n\t    \t<i class=\"fa fa-angle-up\" aria-hidden=\"true\" ng-show=\"toggleFlag\"></i>\r\n    \t</a>\r\n    </div>\r\n  </header>\r\n  <div class=\"zc_order_filtrate\" ng-show=\"toggleFlag\">\r\n  \t<ul>\r\n  \t\t<a href=\"javascript:;\" class=\"list-group-item\" ng-click=\"select()\">\r\n  \t\t\t全部\r\n  \t\t\t<i class=\"fa fa-check pull-right\" aria-hidden=\"true\" ng-hide=\"\"></i>\r\n  \t\t</a>\r\n  \t\t<a href=\"javascript:;\" class=\"list-group-item\" ng-click=\"select()\">\r\n  \t\t\t处理中\r\n  \t\t\t<i class=\"fa fa-check pull-right\" aria-hidden=\"true\" ng-show=\"\"></i>\r\n  \t\t</a>\r\n  \t\t<a href=\"javascript:;\" class=\"list-group-item\" ng-click=\"select()\">\r\n  \t\t\t预定成功\r\n  \t\t\t<i class=\"fa fa-check pull-right\" aria-hidden=\"true\" ng-show=\"\"></i>\r\n  \t\t</a>\r\n  \t\t<a href=\"javascript:;\" class=\"list-group-item\" ng-click=\"select()\">\r\n  \t\t\t支付失败\r\n  \t\t\t<i class=\"fa fa-check pull-right\" aria-hidden=\"true\" ng-show=\"\"></i>\r\n  \t\t</a>\r\n  \t\t<a href=\"javascript:;\" class=\"list-group-item\" ng-click=\"select()\">\r\n  \t\t\t待付款\r\n  \t\t\t<i class=\"fa fa-check pull-right\" aria-hidden=\"true\" ng-show=\"\"></i>\r\n  \t\t</a>\r\n  \t\t<a href=\"javascript:;\" class=\"list-group-item\" ng-click=\"select()\">\r\n  \t\t\t服务中\r\n  \t\t\t<i class=\"fa fa-check pull-right\" aria-hidden=\"true\" ng-show=\"\"></i>\r\n  \t\t</a>\r\n  \t\t<a href=\"javascript:;\" class=\"list-group-item\" ng-click=\"select()\">\r\n  \t\t\t已完成\r\n  \t\t\t<i class=\"fa fa-check pull-right\" aria-hidden=\"true\" ng-show=\"\"></i>\r\n  \t\t</a>\r\n  \t\t<a href=\"javascript:;\" class=\"list-group-item\" ng-click=\"select()\">\r\n  \t\t\t已取消\r\n  \t\t\t<i class=\"fa fa-check pull-right\" aria-hidden=\"true\" ng-show=\"\"></i>\r\n  \t\t</a>\r\n  \t</ul>\r\n  </div>\r\n  <div class=\"container\">\r\n  \t<div class=\"content-container\">\r\n  \t\t<ul>\r\n        <rd-widget>\r\n          <rd-widget-body classes=\"no-padding\" loading=\"loading\" failing=\"failing\" empty=\"empty\">\r\n            <div scroll-trigger=\"loadMore()\" trigger-run trigger-at-end trigger-persist trigger-active=\"!(loading || failing || empty || busy || lazy || finish || scrollDisabled)\">\r\n        \t\t\t<li class=\"list-group-item\">\r\n        \t\t\t\t<a ui-sref=\"myorder.course.detail\">\r\n        \t\t\t\t\t<h3 class=\"title\">早教36课时包</h3>\r\n                  <span class=\"status\">已完成</span>\r\n        \t\t\t\t\t<div class=\"info\">\r\n                    <table>\r\n                      <tr>\r\n                        <td>\r\n                          <p class=\"time\">\r\n                            有效期：\r\n                            <span>2017-07-17 至 2018-07-16</span>\r\n                          </p>\r\n                          <p class=\"address\">\r\n                            教学点：\r\n                            <span>纽约国际儿童俱乐部西红门鸿坤中心</span>\r\n                          </p>\r\n                        </td>\r\n                        <td>\r\n                          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n        \t\t\t\t\t</div>\r\n        \t\t\t\t</a>\r\n        \t\t\t</li>\r\n        \t\t\t<li class=\"list-group-item\">\r\n        \t\t\t\t<a ui-sref=\"myorder.course.detail\">\r\n        \t\t\t\t\t<h3 class=\"title\">早教36课时包</h3>\r\n                  <span class=\"status\">预定成功</span>\r\n        \t\t\t\t\t<div class=\"info\">\r\n        \t\t\t\t\t\t<table>\r\n                      <tr>\r\n                        <td>\r\n                          <p class=\"time\">\r\n                            有效期：\r\n                            <span>2017-07-17 至 2018-07-16</span>\r\n                          </p>\r\n                          <p class=\"address\">\r\n                            教学点：\r\n                            <span>纽约国际儿童俱乐部西红门鸿坤中心</span>\r\n                          </p>\r\n                        </td>\r\n                        <td>\r\n                          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n        \t\t\t\t\t</div>\r\n        \t\t\t\t</a>\r\n        \t\t\t</li>\r\n        \t\t\t<li class=\"list-group-item\">\r\n        \t\t\t\t<a ui-sref=\"myorder.course.detail\">\r\n        \t\t\t\t\t<h3 class=\"title\">早教36课时包</h3>\r\n                  <span class=\"status\">待付款</span>\r\n        \t\t\t\t\t<div class=\"info\">\r\n        \t\t\t\t\t\t<table>\r\n                      <tr>\r\n                        <td>\r\n                          <p class=\"time\">\r\n                            有效期：\r\n                            <span>2017-07-17 至 2018-07-16</span>\r\n                          </p>\r\n                          <p class=\"address\">\r\n                            教学点：\r\n                            <span>纽约国际儿童俱乐部西红门鸿坤中心</span>\r\n                          </p>\r\n                        </td>\r\n                        <td>\r\n                          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n        \t\t\t\t\t</div>\r\n        \t\t\t\t</a>\r\n        \t\t\t</li>\r\n        \t\t\t<li class=\"list-group-item\">\r\n        \t\t\t\t<a ui-sref=\"myorder.course.detail\">\r\n        \t\t\t\t\t<h3 class=\"title\">早教36课时包</h3>\r\n                  <span class=\"status\">已取消</span>\r\n        \t\t\t\t\t<div class=\"info\">\r\n        \t\t\t\t\t\t<table>\r\n                      <tr>\r\n                        <td>\r\n                          <p class=\"time\">\r\n                            有效期：\r\n                            <span>2017-07-17 至 2018-07-16</span>\r\n                          </p>\r\n                          <p class=\"address\">\r\n                            教学点：\r\n                            <span>纽约国际儿童俱乐部西红门鸿坤中心</span>\r\n                          </p>\r\n                        </td>\r\n                        <td>\r\n                          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n        \t\t\t\t\t</div>\r\n        \t\t\t\t</a>\r\n        \t\t\t</li>\r\n        \t\t\t<li class=\"list-group-item\">\r\n        \t\t\t\t<a ui-sref=\"myorder.course.detail\">\r\n        \t\t\t\t\t<h3 class=\"title\">早教36课时包</h3>\r\n                  <span class=\"status\">服务中</span>\r\n        \t\t\t\t\t<div class=\"info\">\r\n        \t\t\t\t\t\t<table>\r\n                      <tr>\r\n                        <td>\r\n                          <p class=\"time\">\r\n                            有效期：\r\n                            <span>2017-07-17 至 2018-07-16</span>\r\n                          </p>\r\n                          <p class=\"address\">\r\n                            教学点：\r\n                            <span>纽约国际儿童俱乐部西红门鸿坤中心</span>\r\n                          </p>\r\n                        </td>\r\n                        <td>\r\n                          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n        \t\t\t\t\t</div>\r\n        \t\t\t\t</a>\r\n        \t\t\t</li>\r\n        \t\t\t<li class=\"list-group-item\">\r\n        \t\t\t\t<a ui-sref=\"myorder.course.detail\">\r\n        \t\t\t\t\t<h3 class=\"title\">早教36课时包</h3>\r\n                  <span class=\"status\">处理中</span>\r\n        \t\t\t\t\t<div class=\"info\">\r\n        \t\t\t\t\t\t<table>\r\n                      <tr>\r\n                        <td>\r\n                          <p class=\"time\">\r\n                            有效期：\r\n                            <span>2017-07-17 至 2018-07-16</span>\r\n                          </p>\r\n                          <p class=\"address\">\r\n                            教学点：\r\n                            <span>纽约国际儿童俱乐部西红门鸿坤中心</span>\r\n                          </p>\r\n                        </td>\r\n                        <td>\r\n                          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n        \t\t\t\t\t</div>\r\n        \t\t\t\t</a>\r\n        \t\t\t</li>\r\n        \t\t\t<li class=\"list-group-item\">\r\n        \t\t\t\t<a ui-sref=\"myorder.course.detail\">\r\n        \t\t\t\t\t<h3 class=\"title\">早教36课时包</h3>\r\n                  <span class=\"status\">支付失败</span>\r\n        \t\t\t\t\t<div class=\"info\">\r\n        \t\t\t\t\t\t<table>\r\n                      <tr>\r\n                        <td>\r\n                          <p class=\"time\">\r\n                            有效期：\r\n                            <span>2017-07-17 至 2018-07-16</span>\r\n                          </p>\r\n                          <p class=\"address\">\r\n                            教学点：\r\n                            <span>纽约国际儿童俱乐部西红门鸿坤中心</span>\r\n                          </p>\r\n                        </td>\r\n                        <td>\r\n                          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n        \t\t\t\t\t</div>\r\n        \t\t\t\t</a>\r\n        \t\t\t</li>\r\n              <div class=\"scroll-loading\" ng-show=\"busy\">\r\n                <i class=\"fa fa-spinner fa-pulse\"></i><span>加载中...</span>\r\n              </div>\r\n              <div class=\"scroll-loadfail\" ng-show=\"lazy\">加载失败，请检查网络连接...</div>\r\n              <div class=\"scroll-loadfinish\" ng-show=\"finish\">没有更多了</div>\r\n            </div>\r\n          </rd-widget-body>\r\n        </rd-widget>\r\n  \t\t</ul>\r\n  \t</div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/myorder/course/list/list.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});