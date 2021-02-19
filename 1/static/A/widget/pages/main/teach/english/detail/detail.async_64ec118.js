define('A:widget/pages/main/teach/english/detail/detail.async', function(require, exports, module) {

  return ['$rootScope', '$scope', '$stateParams', 'webservice', 'globals', 
  	function ($rootScope, $scope, $stateParams, webservice, globals) {
  
  	$rootScope.pageTitle = '大家一起学单词';
  	$rootScope.pageImage = globals.LOGO_IMAGE;
  
  	$scope.category_id = $stateParams.category_id || '';
  
  	$scope.list = [];
  	$scope.busy = false;
  	$scope.lazy = false;
  	$scope.finish = false;
  
  	var limit = 30;
  	var count = 0;
  	$scope.offset = count * limit;
  
  	$scope.loading = true;
    $scope.failing = false;
    $scope.empty = false;
    webservice.getWordList($scope.category_id, limit, $scope.offset).then(function (res) {
  		$scope.loading = false;
  		var status = res.status;
  		if (globals.STATUS_OK === status) {
  			var items = res.data.list;
  			for (var i = 0; i < items.length; i++) {
          $scope.list.push(items[i]);
        }
        count++;
        $scope.offset = count * limit;
  		} else if (globals.SPECIFIC_ERROR === status) {
  			$scope.empty = true;
  		} else {
  			$scope.failing = true;
  		}
  	}, function (res) {
  		$scope.loading = false;
      $scope.failing = true;
  		var res = res;
  	});
  
  	$scope.loadMore = function () {
  		$scope.busy = true;
  		$scope.lazy = false;
  		$scope.finish = false;
  		webservice.getWordList($scope.category_id, limit, $scope.offset).then(function (res) {
  			$scope.busy = false;
  			var status = res.status;
  			if (globals.STATUS_OK === status) {
  				var items = res.data.list;
  				for (var i = 0; i < items.length; i++) {
  	        $scope.list.push(items[i]);
  	      }
  	      count++;
        	$scope.offset = count * limit;
  			} else if (globals.SPECIFIC_ERROR === status) {
  				$scope.finish = true;
  			} else {
  				$scope.lazy = true;
  			}
  		}, function (res) {
  			$scope.busy = false;
  			$scope.lazy = true;
  			var res = res;
  		});
  	};
  
  	$scope.$on('$destroy', function () {
  		$scope.scrollDisabled = true;
  	});
  
  	if (!$scope.$$phase) {
      $scope.$apply();
    }
  }];
  

});
