define('A:widget/pages/score/memberlevel/memberlevel.async', function(require, exports, module) {

  return ['$rootScope', '$scope', 'globals', function ($rootScope, $scope, globals) {
  
  	$rootScope.pageTitle = '我的会员级别';
  	$rootScope.pageImage = globals.LOGO_IMAGE;
  
  	if (!$scope.$$phase) {
      $scope.$apply();
    }
  }];
  

});
