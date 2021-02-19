define('A:widget/pages/score/memberlevel/memberlevel', function(require, exports, module) {

  module.exports = {
    url: '/memberlevel',
    template: "<!--\r\n    @require \"A:widget/pages/score/memberlevel/memberlevel.css\"\r\n-->\r\n\r\n<div class=\"memberlevel-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" ui-sref=\"setting.all\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">会员级别</div>\r\n  </header>\r\n  <div class=\"container\">\r\n  \t<div class=\"head\">\r\n      <div class=\"outer\">\r\n        <div class=\"rule-outer clearfix\">\r\n          <a ui-sref=\"score.pointrule({from:$state.current.name})\" class=\"rule-link\">\r\n            <i class=\"fa fa-question-circle-o\" aria-hidden=\"true\"></i>\r\n            <span>如何升级</span>\r\n          </a>\r\n        </div>\r\n        <div class=\"member-ph\">\r\n          <div class=\"img-common img-pu img-size img-pos\"></div>\r\n        </div>\r\n        <div class=\"member-info\">\r\n          <table>\r\n            <tr>\r\n              <td>\r\n                <a href=\"javascript:;\" ng-click=\"getTotalPoints()\">\r\n                  <div>135</div>\r\n                  <div>累计积分</div>\r\n                </a>\r\n              </td>\r\n              <td>\r\n                <a ui-sref=\"score.availpoints({from:$state.current.name})\">\r\n                  <div>135</div>\r\n                  <div>可用积分</div>\r\n                </a>\r\n              </td>\r\n            </tr>\r\n          </table>\r\n        </div>\r\n        <div class=\"level-pt\">\r\n          <div class=\"levelbar\">\r\n            <p class=\"lvnum\">\r\n              <span style=\"padding-left:39%;\">\r\n                <i>135</i>/150\r\n              </span>\r\n            </p>\r\n            <div class=\"bar-box\">\r\n              <img class=\"level-bar\" src=\"/static/A/widget/pages/score/memberlevel/images/level_bar_d7b419f.png\">\r\n              <span class=\"yelbar\" style=\"width:46%;\"></span>\r\n            </div>\r\n            <ul class=\"lvname\">\r\n              <li>普卡</li>\r\n              <li>银卡</li>\r\n              <li>金卡</li>\r\n              <li>白金卡</li>\r\n              <li>钻石卡</li>\r\n            </ul>\r\n            <p class=\"attxt\">距下一等级还需15分！会员等级有效期 2018.6.5</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"content\">\r\n      <div class=\"title\">累计积分</div>\r\n      <div class=\"total-list\">\r\n        <rd-widget>\r\n          <rd-widget-body classes=\"no-padding\" loading=\"loading\" failing=\"failing\" empty=\"empty\">\r\n            <div scroll-trigger=\"loadMore()\" trigger-run trigger-at-end trigger-persist trigger-active=\"!(loading || failing || empty || busy || lazy || finish || scrollDisabled)\">\r\n              <div class=\"po-li\">\r\n                <div class=\"riqi\">\r\n                  <span class=\"date\">2017-07-08</span>\r\n                </div>\r\n                <div class=\"details\">\r\n                  <i class=\"point-icon\"></i>\r\n                  <span class=\"det1\">购买课程返积分</span>\r\n                  <span class=\"det2\">\r\n                    订单编号：<i>14992287234913</i>\r\n                  </span>\r\n                </div>\r\n                <div class=\"ppoint\">\r\n                  <span><i>+31</i>积分</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"po-li\">\r\n                <div class=\"riqi\">\r\n                  <span class=\"date\">2017-06-08</span>\r\n                </div>\r\n                <div class=\"details\">\r\n                  <i class=\"point-icon\"></i>\r\n                  <span class=\"det1\">报名活动返积分</span>\r\n                  <span class=\"det2\">\r\n                    订单编号：<i>14966300118520</i>\r\n                  </span>\r\n                </div>\r\n                <div class=\"ppoint\">\r\n                  <span><i>+35</i>积分</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"po-li\">\r\n                <div class=\"riqi\">\r\n                  <span class=\"date\">2017-06-05</span>\r\n                </div>\r\n                <div class=\"details\">\r\n                  <i class=\"point-icon\"></i>\r\n                  <span class=\"det1\">购买课程返积分</span>\r\n                  <span class=\"det2\">\r\n                    订单编号：<i>14962887944903</i>\r\n                  </span>\r\n                </div>\r\n                <div class=\"ppoint\">\r\n                  <span><i>+69</i>积分</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"po-li\">\r\n                <div class=\"riqi\">\r\n                  <span class=\"date\">2017-06-05</span>\r\n                </div>\r\n                <div class=\"details\">\r\n                  <i class=\"point-icon\"></i>\r\n                  <span class=\"det1\">购买课程返积分</span>\r\n                  <span class=\"det2\">\r\n                    订单编号：<i>14962887944903</i>\r\n                  </span>\r\n                </div>\r\n                <div class=\"ppoint\">\r\n                  <span><i>+69</i>积分</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"po-li\">\r\n                <div class=\"riqi\">\r\n                  <span class=\"date\">2017-06-05</span>\r\n                </div>\r\n                <div class=\"details\">\r\n                  <i class=\"point-icon\"></i>\r\n                  <span class=\"det1\">购买课程返积分</span>\r\n                  <span class=\"det2\">\r\n                    订单编号：<i>14962887944903</i>\r\n                  </span>\r\n                </div>\r\n                <div class=\"ppoint\">\r\n                  <span><i>+69</i>积分</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"scroll-loading\" ng-show=\"busy\">\r\n                <i class=\"fa fa-spinner fa-pulse\"></i><span>加载中...</span>\r\n              </div>\r\n              <div class=\"scroll-loadfail\" ng-show=\"lazy\">加载失败，请检查网络连接...</div>\r\n              <div class=\"scroll-loadfinish\" ng-show=\"finish\">没有更多了</div>\r\n            </div>\r\n          </rd-widget-body>\r\n        </rd-widget>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/score/memberlevel/memberlevel.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
