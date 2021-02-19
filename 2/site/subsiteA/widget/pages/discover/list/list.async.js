return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {

	$rootScope.pageTitle = '最新动态';
  $rootScope.pageImage = globals.LOGO_IMAGE;

  $scope.items = [{
    news_id: 1,
    news_title: '儿童成长的敏感期',
    news_pic: 'http://developapi-main.stor.sinaapp.com/images/story/20170120/1484876294.jpg'
  }, {
    news_id: 2,
    news_title: '儿童成长的敏感期',
    news_pic: 'http://developapi-main.stor.sinaapp.com/images/story/20170120/1484876294.jpg'
  }];

  $scope.loadMore = function () {
    $scope.$applyAsync(function () {
      $scope.items.push({
        news_id: 3,
        news_title: '儿童成长的敏感期',
        news_pic: 'http://developapi-main.stor.sinaapp.com/images/story/20170120/1484876294.jpg'
      });
      $scope.items.push({
        news_id: 4,
        news_title: '儿童成长的敏感期',
        news_pic: 'http://developapi-main.stor.sinaapp.com/images/story/20170120/1484876294.jpg'
      });
      $scope.items.push({
        news_id: 5,
        news_title: '儿童成长的敏感期',
        news_pic: 'http://developapi-main.stor.sinaapp.com/images/story/20170120/1484876294.jpg'
      });
      $scope.scrollDisabled = true;
    });
  };

  $scope.$on('$destroy', function () {
    $scope.scrollDisabled = true;
  });

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
