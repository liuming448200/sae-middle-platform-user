define('A:widget/pages/instmore/brand/brand.async', function(require, exports, module) {

  return ['$rootScope', '$scope', '$stateParams', '$state', 'globals', 'shareService', 
  	function ($rootScope, $scope, $stateParams, $state, globals, shareService) {
  
  	$rootScope.pageTitle = '品牌成长历程';
  	$rootScope.pageImage = globals.LOGO_IMAGE;
  
  	var from = $stateParams.from;
  
  	$scope.back = function () {
  		$state.go(from && 'instmore.brand' !== from ? from : 'institution');
  	};
  
  	$scope.share = function () {
  		shareService.open();
  	};
  
  	if (!$scope.$$phase) {
      $scope.$apply();
    }
  }];
  

});
