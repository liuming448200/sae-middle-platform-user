define('A:widget/pages/message/message.async', function(require, exports, module) {

  return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {
  
  	$rootScope.pageTitle = '用户消息';
  	$rootScope.pageImage = globals.LOGO_IMAGE;
  
  	if (!$scope.$$phase) {
      $scope.$apply();
    }
  }];
  

});
