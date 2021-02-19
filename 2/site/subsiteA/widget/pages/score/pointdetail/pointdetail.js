module.exports = {
  url: '/pointdetail',
  template: __inline('./pointdetail.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('pointdetail.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
