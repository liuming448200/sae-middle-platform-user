module.exports = {
  url: '/month',
  template: __inline('./month.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('month.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
