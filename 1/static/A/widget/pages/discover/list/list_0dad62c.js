define('A:widget/pages/discover/list/list', function(require, exports, module) {

  module.exports = {
    url: '/list',
    template: "<!--\r\n    @require \"A:widget/pages/discover/list/list.css\"\r\n-->\r\n\r\n<div class=\"list-container\">\r\n\t<div class=\"content-container\">\r\n\t\t<rd-widget>\r\n\t\t\t<rd-widget-body classes=\"no-padding\" loading=\"loading\" failing=\"failing\" empty=\"empty\">\r\n\t\t\t\t<div scroll-trigger=\"loadMore()\" trigger-run trigger-at-end trigger-persist trigger-active=\"!(loading || failing || empty || busy || lazy || finish || scrollDisabled)\">\r\n\t\t      <div class=\"list-group-item\" ng-repeat=\"item in items\">\r\n\t\t        <a ui-sref=\"discover.detail({news_id:item.news_id})\" class=\"thumbnail\">\r\n\t            <img src=\"/static/A/images/default_0e3a6a2.jpg\" lazy-img=\"{{item.news_pic}}\" scroll-trigger=\"displayImage()\" alt=\"{{item.news_title}}\">\r\n\t            <div class=\"cover-layer cover-layer-color\"></div>\r\n\t            <div class=\"cover-layer\">\r\n\t            \t<table>\r\n\t            \t\t<tr>\r\n\t            \t\t\t<td>{{item.news_title}}</td>\r\n\t            \t\t</tr>\r\n\t            \t</table>\r\n\t            </div>\r\n\t        \t</a>\r\n\t\t      </div>\r\n\t\t      <div class=\"scroll-loading\" ng-show=\"busy\">\r\n\t\t        <i class=\"fa fa-spinner fa-pulse\"></i><span>加载中...</span>\r\n\t\t      </div>\r\n\t\t      <div class=\"scroll-loadfail\" ng-show=\"lazy\">加载失败，请检查网络连接...</div>\r\n\t\t      <div class=\"scroll-loadfinish\" ng-show=\"finish\">没有更多了</div>\r\n\t\t    </div>\r\n\t\t\t</rd-widget-body>\r\n\t\t</rd-widget>\r\n\t</div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/discover/list/list.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
