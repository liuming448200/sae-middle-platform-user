define('A:widget/pages/instmore/course/detail/detail', function(require, exports, module) {

  module.exports = {
    url: '/detail',
    template: "<!--\r\n    @require \"A:widget/pages/instmore/course/detail/detail.css\"\r\n-->\r\n\r\n<div class=\"detail-container\" scroll-trigger=\"changeVideo()\" trigger-run trigger-persist trigger-active=\"!scrollDisabled\">\r\n\t<article>\r\n\t\t<div class=\"head\">\r\n\t\t\t<h1 class=\"title\">亲亲宝贝A</h1>\r\n\t\t\t<div class=\"info\">\r\n\t\t\t\t<span class=\"time js-time\">6-12个月</span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"content\">\r\n\t\t\t<div class=\"page js-page on\">\r\n\t\t\t\t<div class=\"videogular-container\">\r\n\t\t\t    <videogular vg-player-ready=\"onPlayerReady($API)\" vg-plays-inline=\"true\" style=\"background-color:#ffffff; height:auto;\" ng-class=\"{show: isPlay, hide: isHide}\">\r\n\t\t\t      <vg-media vg-src=\"config.sources\"\r\n\t\t\t          vg-tracks=\"config.tracks\" style=\"height:auto;\">\r\n\t\t\t      </vg-media>\r\n\t\t\t \r\n\t\t\t      <vg-controls>\r\n\t\t\t        <vg-play-pause-button></vg-play-pause-button>\r\n\t\t\t        <vg-time-display>{{ currentTime | date:'mm:ss' }}</vg-time-display>\r\n\t\t\t        <vg-scrub-bar>\r\n\t\t\t          <vg-scrub-bar-current-time></vg-scrub-bar-current-time>\r\n\t\t\t        </vg-scrub-bar>\r\n\t\t\t        <vg-time-display>{{ timeLeft | date:'mm:ss' }}</vg-time-display>\r\n\t\t\t        <vg-volume>\r\n\t\t\t          <vg-mute-button></vg-mute-button>\r\n\t\t\t          <vg-volume-bar></vg-volume-bar>\r\n\t\t\t        </vg-volume>\r\n\t\t\t        <vg-fullscreen-button></vg-fullscreen-button>\r\n\t\t\t      </vg-controls>\r\n\t\t\t \r\n\t\t\t      <vg-overlay-play></vg-overlay-play>\r\n\t\t\t      <vg-buffering></vg-buffering>\r\n\t\t\t      <vg-poster vg-url='config.plugins.poster'></vg-poster>\r\n\t\t\t    </videogular>\r\n\t\t\t    <img class=\"spe-img\" src=\"/static/A/widget/pages/instmore/course/detail/images/video_48456bb.jpg\" ng-hide=\"isPlay\" style=\"height:100%;\">\r\n\t\t\t    <div class=\"spe-img img-play\" ng-click=\"playVideo()\" ng-hide=\"isPlay\"></div>\r\n\t\t\t  </div>\r\n\t\t\t\t<p>针对这一月龄宝宝注意力维持较短的特征，“亲亲宝贝A”安排单项活动时间短，活动项目多样的课程内容，吸引宝宝的专注力，充分利用课堂时间。在“教师指导活动”、“充气滚筒”、“俯卧时间”、“宝宝瑜伽”等运动环节中，宝贝们身体的力量和稳定性得到提高，生长发育得到促进。而“彩虹伞”、“美式手语”、“主题故事阅读”等环节，则给予婴儿脑细胞以适宜的刺激，增强感知能力与智能发育。</p>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</article>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	$scope.API = null;
  
    	$scope.onPlayerReady = function (API) {
  	    $scope.API = API;
  	  };
  
    	require.async(['A:widget/pages/instmore/course/detail/detail.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
