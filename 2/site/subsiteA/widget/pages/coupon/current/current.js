module.exports = {
  url: '/current',
  template: __inline('./current.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('current.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
