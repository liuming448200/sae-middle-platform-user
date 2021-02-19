module.exports = {
  url: '/city',
  template: __inline('./city.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('city.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
