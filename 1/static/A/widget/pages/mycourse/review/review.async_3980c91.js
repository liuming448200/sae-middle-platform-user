define('A:widget/pages/mycourse/review/review.async', function(require, exports, module) {

  return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {
  
  	$rootScope.pageTitle = '孩子的课程回顾';
  	$rootScope.pageImage = globals.LOGO_IMAGE;
  
  	if (!$scope.$$phase) {
      $scope.$apply();
    }
  }];
  

});
