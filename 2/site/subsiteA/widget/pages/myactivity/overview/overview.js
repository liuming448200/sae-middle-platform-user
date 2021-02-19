module.exports = {
  url: '/overview',
  template: __inline('./overview.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('overview.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
