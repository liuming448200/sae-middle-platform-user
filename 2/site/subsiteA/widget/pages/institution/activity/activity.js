module.exports = {
  url: '/activity',
  template: __inline('./activity.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('activity.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
