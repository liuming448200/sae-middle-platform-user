module.exports = {
	url: '/reset',
	template: __inline('./reset.html'),
	controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('reset.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
