define('A:widget/pages/pay/failure/failure.async', function(require, exports, module) {

  return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {
  
  	$rootScope.pageTitle = '支付失败';
  	$rootScope.pageImage = globals.LOGO_IMAGE;
  
  	if (!$scope.$$phase) {
      $scope.$apply();
    }
  }];
  

});
