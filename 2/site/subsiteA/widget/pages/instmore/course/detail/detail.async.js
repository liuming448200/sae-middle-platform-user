return ['$rootScope', '$scope', '$sce', 'UAdetect', 'globals', function ($rootScope, $scope, $sce, UAdetect, globals) {

  $rootScope.pageTitle = '亲亲宝贝A';
  $rootScope.pageImage = globals.LOGO_IMAGE;

  var qqFlag = UAdetect.isQQBrowser();
  var UCFlag = UAdetect.isUCBrowser();

  $scope.config = {};

  $scope.config.sources = [
    {src: $sce.trustAsResourceUrl('http://static.noboup.com/res/hm51f/xc/vid_ham_wb.mp4'), type: "video/mp4"}
  ];

  $scope.config.plugins = {
    poster: __inline('./images/video.jpg')
  };

  $scope.playVideo = function () {
  	$scope.isPlay = true;
    $scope.isHide = false;
    $scope.API.play();

    if ($rootScope.weixinFlag || qqFlag || UCFlag) {
    	var videoHeight = $('.videogular-container video').height();
    	if (!!videoHeight) {
    		$('.videogular-container .img-play').height(videoHeight);
        $('.videogular-container').height(videoHeight);
        if (qqFlag) {
          $('.videogular-container video').height(videoHeight);
          $('.videogular-container video').css('overflow', 'hidden');
        }
    	}
    }
  };

  $scope.changeVideo = function () {
    if ($scope.isPlay) {
      $scope.isPlay = false;
      $scope.API.pause();
      if ($rootScope.weixinFlag || qqFlag || UCFlag) {
        var videoHeight = $('.videogular-container video').height();
        if (!!videoHeight) {
          $('.videogular-container .img-play').height(videoHeight);
          $('.videogular-container').height(videoHeight);
          if (qqFlag) {
            $('.videogular-container video').height(videoHeight);
            $('.videogular-container video').css('overflow', 'hidden');
          }
        }

        $scope.isHide = true;
      }
    }
  };

  window.onorientationchange = function () {
  	if (UCFlag) {
      $scope.API.play();
    }
  };

  $scope.$on('$destroy', function () {
    $scope.scrollDisabled = true;
  });

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
