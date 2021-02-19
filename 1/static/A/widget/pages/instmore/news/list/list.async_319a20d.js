define('A:widget/pages/instmore/news/list/list.async', function(require, exports, module) {

  return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {
  
  	$rootScope.pageTitle = '学校新闻';
  	$rootScope.pageImage = globals.LOGO_IMAGE;
  
  	$scope.$on('$destroy', function () {
  		$scope.scrollDisabled = true;
  	});
  
  	if (!$scope.$$phase) {
      $scope.$apply();
    }
  }];
  

});
