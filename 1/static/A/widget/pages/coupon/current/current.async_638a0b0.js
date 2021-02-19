define('A:widget/pages/coupon/current/current.async', function(require, exports, module) {

  return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {
  
  	$rootScope.pageTitle = '我的可用优惠券';
  	$rootScope.pageImage = globals.LOGO_IMAGE;
  
  	if (!$scope.$$phase) {
      $scope.$apply();
    }
  }];
  

});
