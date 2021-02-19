define('A:widget/pages/myorder/course/list/list.async', function(require, exports, module) {

  return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {
  
  	$rootScope.pageTitle = '课程订单列表';
  	$rootScope.pageImage = globals.LOGO_IMAGE;
  
  	$scope.toggle = function () {
  		$scope.toggleFlag = !$scope.toggleFlag;
  	};
  
  	$scope.select = function () {
  		$scope.toggleFlag = false;
  	};
  
  	if (!$scope.$$phase) {
      $scope.$apply();
    }
  }];
  

});
