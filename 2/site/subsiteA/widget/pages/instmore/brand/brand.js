module.exports = {
  url: '/brand',
  template: __inline('./brand.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('brand.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
