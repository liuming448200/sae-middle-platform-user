module.exports = {
  url: '/institution?city&cityName',
  template: __inline('./institution.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('institution.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
