module.exports = {
  url: '/login?from',
  template: __inline('./login.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('login.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
