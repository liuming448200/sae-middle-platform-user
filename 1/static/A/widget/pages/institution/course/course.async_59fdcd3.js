define('A:widget/pages/institution/course/course.async', function(require, exports, module) {

  return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {
  
  	$rootScope.pageTitle = '大家一起来上课';
  	$rootScope.pageImage = globals.LOGO_IMAGE;
  	
  	$scope.$on('$destroy', function () {
  		$scope.scrollDisabled = true;
  	});
  
  	if (!$scope.$$phase) {
      $scope.$apply();
    }
  }];
  

});
