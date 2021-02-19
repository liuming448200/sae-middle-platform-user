define('A:widget/pages/main/teach/english/type/type', function(require, exports, module) {

  module.exports = {
    url: '/type',
    template: "<!--\r\n    @require \"A:widget/pages/main/teach/english/type/type.css\"\r\n-->\r\n\r\n<div class=\"type-container\">\r\n  <div class=\"container\">\r\n    <div class=\"content-container\">\r\n      <rd-widget>\r\n        <rd-widget-body classes=\"no-padding\" loading=\"loading\" failing=\"failing\" empty=\"empty\">\r\n          <div scroll-trigger=\"loadMore()\" trigger-run trigger-at-end trigger-persist trigger-active=\"!(loading || failing || empty || busy || lazy || finish || scrollDisabled)\">\r\n            <a href=\"javascript:;\" ui-sref=\"main.teach.english.detail({category_id: item.category_id})\" class=\"list-group-item\" ng-repeat=\"item in list\">\r\n              <span class=\"badge\" style=\"background-color: #5cb85c;\"><i class=\"fa fa-arrow-circle-right\"></i></span>\r\n              <h1>{{item.english}}<small><span>(</span>{{item.chinese}}<span>)</span></small></h1>\r\n            </a>\r\n            <div class=\"scroll-loading\" ng-show=\"busy\">\r\n              <i class=\"fa fa-spinner fa-pulse\"></i><span>加载中...</span>\r\n            </div>\r\n            <div class=\"scroll-loadfail\" ng-show=\"lazy\">加载失败，请检查网络连接...</div>\r\n            <div class=\"scroll-loadfinish\" ng-show=\"finish\">没有更多了</div>\r\n          </div>\r\n        </rd-widget-body>\r\n      </rd-widget>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/main/teach/english/type/type.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
