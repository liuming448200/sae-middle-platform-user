module.exports = {
  url: '/week',
  template: __inline('./week.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('week.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
