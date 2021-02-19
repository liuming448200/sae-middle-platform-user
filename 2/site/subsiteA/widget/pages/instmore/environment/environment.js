module.exports = {
  url: '/environment',
  template: __inline('./environment.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('environment.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
