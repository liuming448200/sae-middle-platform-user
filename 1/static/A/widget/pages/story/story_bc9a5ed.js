define('A:widget/pages/story/story', function(require, exports, module) {

  module.exports = {
    url: '/story/:story_id',
    template: "<!--\r\n    @require \"A:widget/pages/story/story.css\"\r\n-->\r\n\r\n<div class=\"story-detail-container\">\r\n  <header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" ui-sref=\"main.teach.story\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <a class=\"header-btn header-pos-right\" href=\"javascript:;\" ng-click=\"share()\" ng-hide=\"weixinFlag\">\r\n      <i class=\"fa fa-share\"></i>\r\n    </a>\r\n    <div class=\"title\">故事详情</div>\r\n  </header>\r\n  <div class=\"container\">\r\n    <div class=\"content-container\">\r\n      <rd-widget>\r\n        <rd-widget-body classes=\"no-padding\" loading=\"loading\" failing=\"failing\" empty=\"empty\">\r\n          <ul class=\"thumbnails\">\r\n            <li class=\"span4\">\r\n              <div class=\"thumbnail\">\r\n                <img alt=\"{{story.name}}\" src=\"/static/A/images/default_0e3a6a2.jpg\" ng-src=\"{{story.pic}}\">\r\n                <div class=\"caption\">\r\n                  <h3>{{story.name}}</h3>\r\n                  <p class=\"help-block text-center\">来源：网络</p>\r\n                  <p class=\"story-content\" ng-bind-html=\"story.content|unescapeHTMLFilter\"></p>\r\n                  <p style=\"text-align: center; margin: 5px 0;\">\r\n                    <a class=\"btn btn-success\" href=\"javascript:;\" data-toggle=\"collapse\" data-target=\"#sense\">寓意</a>\r\n                  </p>\r\n                  <p id=\"sense\" class=\"collapse\" ng-bind-html=\"story.implication|unescapeHTMLFilterNoSpace\"></p>\r\n                </div>\r\n              </div>\r\n            </li>\r\n          </ul>\r\n        </rd-widget-body>\r\n      </rd-widget>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/story/story.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
