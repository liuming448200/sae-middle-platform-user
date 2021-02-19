define('A:widget/pages/song/song', function(require, exports, module) {

  module.exports = {
    url: '/song/:song_id?language',
    template: "<!--\r\n    @require \"A:widget/pages/song/song.css\"\r\n-->\r\n\r\n<div class=\"song-detail-container\">\r\n  <header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ng-click=\"back()\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <a class=\"header-btn header-pos-right\" href=\"javascript:;\" ng-click=\"share()\" ng-hide=\"weixinFlag\">\r\n      <i class=\"fa fa-share\"></i>\r\n    </a>\r\n    <div class=\"title\" ng-show=\"'chinese' === $stateParams.language\">儿歌详情</div>\r\n    <div class=\"title\" ng-show=\"'english' === $stateParams.language\">song detail</div>\r\n  </header>\r\n  <div class=\"container\">\r\n    <div class=\"content-container\">\r\n      <rd-widget>\r\n        <rd-widget-body classes=\"no-padding\" loading=\"loading\" failing=\"failing\" empty=\"empty\">\r\n          <ul class=\"thumbnails\">\r\n            <li class=\"span4\">\r\n              <div class=\"thumbnail\">\r\n                <img alt=\"{{song.name}}\" src=\"/static/A/images/default_0e3a6a2.jpg\" ng-src=\"{{song.pic}}\">\r\n                <div class=\"caption\" style=\"text-align: center;\">\r\n                  <h3>{{song.name}}</h3>\r\n                  <p class=\"help-block\" ng-show=\"'chinese' === $stateParams.language\">来源：网络</p>\r\n                  <p class=\"help-block\" ng-show=\"'english' === $stateParams.language\">source：network</p>\r\n                  <p ng-repeat=\"item in items\">\r\n                    <audio controls=\"controls\" autoplay=\"autoplay\" loop=\"loop\">\r\n                      <source ng-src=\"{{item|trustSrc}}\" type=\"audio/mpeg\">\r\n                      <object height=\"30\" width=\"300\" data=\"{{item|trustSrc}}\">\r\n                        <embed height=\"30\" width=\"300\" ng-src=\"{{item|trustSrc}}\">\r\n                      </object>\r\n                    </audio>\r\n                  </p>\r\n                  <p style=\"margin: 15px 0;\">\r\n                    <a class=\"btn btn-success\" href=\"javascript:;\" data-toggle=\"collapse\" data-target=\"#sense\">歌词</a>\r\n                  </p>\r\n                  <p id=\"sense\" class=\"collapse\" ng-bind-html=\"song.content|unescapeHTMLFilterNoSpace\"></p>\r\n                </div>\r\n              </div>\r\n            </li>\r\n          </ul>\r\n        </rd-widget-body>\r\n      </rd-widget>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/song/song.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
