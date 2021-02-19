define('A:widget/pages/score/chargerecord/chargerecord', function(require, exports, module) {

  module.exports = {
    url: '/chargerecord?from',
    template: "<!--\r\n    @require \"A:widget/pages/score/chargerecord/chargerecord.css\"\r\n-->\r\n\r\n<div class=\"chargerecord-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" ui-sref=\"score.availpoints({from:$stateParams.from})\">\r\n      <i class=\"fa fa-times\"></i>\r\n    </a>\r\n    <div class=\"title\">兑换记录</div>\r\n  </header>\r\n  <div class=\"container\">\r\n  \t<div class=\"content-container\">\r\n  \t\t<ul>\r\n        <rd-widget>\r\n          <rd-widget-body classes=\"no-padding\" loading=\"loading\" failing=\"failing\" empty=\"empty\">\r\n            <div scroll-trigger=\"loadMore()\" trigger-run trigger-at-end trigger-persist trigger-active=\"!(loading || failing || empty || busy || lazy || finish || scrollDisabled)\">\r\n        \t\t\t<li class=\"list-group-item\">\r\n                <a ui-sref=\"score.chargedetail({from:$stateParams.from})\" class=\"clearfix\">\r\n                  <div class=\"quan-l\">\r\n                    <table class=\"table-common\">\r\n                      <tr>\r\n                        <td>\r\n                          <div class=\"circle\">课</div>\r\n                        </td>\r\n                        <td>\r\n                        \t<div class=\"qu-info\">\r\n      \t\t\t                <span class=\"qu-name\">10元课时包券</span>\r\n      \t\t\t                <span class=\"qu-exch\">已用50积分兑换</span>\r\n      \t\t\t                <span class=\"qu-date\">2017-07-13 08:21:30</span>\r\n      \t\t\t\t            </div>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n                  </div>\r\n                  <div class=\"quan-r\">\r\n                    <table class=\"table-common\">\r\n                      <tr>\r\n                        <td>\r\n                          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n                  </div>\r\n                </a>\r\n              </li>\r\n              <li class=\"list-group-item\">\r\n                <a ui-sref=\"score.chargedetail({from:$stateParams.from})\" class=\"clearfix\">\r\n                  <div class=\"quan-l\">\r\n                    <table class=\"table-common\">\r\n                      <tr>\r\n                        <td>\r\n                          <div class=\"circle\">活</div>\r\n                        </td>\r\n                        <td>\r\n                        \t<div class=\"qu-info\">\r\n      \t\t\t                <span class=\"qu-name\">10元活动券</span>\r\n      \t\t\t                <span class=\"qu-exch\">已用50积分兑换</span>\r\n      \t\t\t                <span class=\"qu-date\">2017-07-13 08:21:30</span>\r\n      \t\t\t\t            </div>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n                  </div>\r\n                  <div class=\"quan-r\">\r\n                    <table class=\"table-common\">\r\n                      <tr>\r\n                        <td>\r\n                          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n                  </div>\r\n                </a>\r\n              </li>\r\n              <li class=\"list-group-item\">\r\n                <a ui-sref=\"score.chargedetail({from:$stateParams.from})\" class=\"clearfix\">\r\n                  <div class=\"quan-l\">\r\n                    <table class=\"table-common\">\r\n                      <tr>\r\n                        <td>\r\n                          <div class=\"circle\">课</div>\r\n                        </td>\r\n                        <td>\r\n                        \t<div class=\"qu-info\">\r\n      \t\t\t                <span class=\"qu-name\">10元课时包券</span>\r\n      \t\t\t                <span class=\"qu-exch\">已用50积分兑换</span>\r\n      \t\t\t                <span class=\"qu-date\">2017-07-13 08:21:30</span>\r\n      \t\t\t\t            </div>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n                  </div>\r\n                  <div class=\"quan-r\">\r\n                    <table class=\"table-common\">\r\n                      <tr>\r\n                        <td>\r\n                          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n                  </div>\r\n                </a>\r\n              </li>\r\n              <li class=\"list-group-item\">\r\n                <a ui-sref=\"score.chargedetail({from:$stateParams.from})\" class=\"clearfix\">\r\n                  <div class=\"quan-l\">\r\n                    <table class=\"table-common\">\r\n                      <tr>\r\n                        <td>\r\n                          <div class=\"circle\">课</div>\r\n                        </td>\r\n                        <td>\r\n                        \t<div class=\"qu-info\">\r\n      \t\t\t                <span class=\"qu-name\">10元课时包券</span>\r\n      \t\t\t                <span class=\"qu-exch\">已用50积分兑换</span>\r\n      \t\t\t                <span class=\"qu-date\">2017-07-13 08:21:30</span>\r\n      \t\t\t\t            </div>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n                  </div>\r\n                  <div class=\"quan-r\">\r\n                    <table class=\"table-common\">\r\n                      <tr>\r\n                        <td>\r\n                          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n                  </div>\r\n                </a>\r\n              </li>\r\n              <li class=\"list-group-item\">\r\n                <a ui-sref=\"score.chargedetail({from:$stateParams.from})\" class=\"clearfix\">\r\n                  <div class=\"quan-l\">\r\n                    <table class=\"table-common\">\r\n                      <tr>\r\n                        <td>\r\n                          <div class=\"circle\">课</div>\r\n                        </td>\r\n                        <td>\r\n                        \t<div class=\"qu-info\">\r\n      \t\t\t                <span class=\"qu-name\">10元课时包券</span>\r\n      \t\t\t                <span class=\"qu-exch\">已用50积分兑换</span>\r\n      \t\t\t                <span class=\"qu-date\">2017-07-13 08:21:30</span>\r\n      \t\t\t\t            </div>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n                  </div>\r\n                  <div class=\"quan-r\">\r\n                    <table class=\"table-common\">\r\n                      <tr>\r\n                        <td>\r\n                          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n                  </div>\r\n                </a>\r\n              </li>\r\n              <div class=\"scroll-loading\" ng-show=\"busy\">\r\n                <i class=\"fa fa-spinner fa-pulse\"></i><span>加载中...</span>\r\n              </div>\r\n              <div class=\"scroll-loadfail\" ng-show=\"lazy\">加载失败，请检查网络连接...</div>\r\n              <div class=\"scroll-loadfinish\" ng-show=\"finish\">没有更多了</div>\r\n            </div>\r\n          </rd-widget-body>\r\n        </rd-widget>\r\n  \t\t</ul>\r\n  \t</div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/score/chargerecord/chargerecord.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
