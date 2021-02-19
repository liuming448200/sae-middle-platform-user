module.exports = {
  url: '/second?mobile',
  template: __inline('./second.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('second.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
