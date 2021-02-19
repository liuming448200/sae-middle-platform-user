module.exports = {
  url: '/detail',
  template: __inline('./detail.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	$scope.API = null;

  	$scope.onPlayerReady = function (API) {
	    $scope.API = API;
	  };

  	require.async('detail.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
