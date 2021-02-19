module.exports = {
  url: '/third?mobile',
  template: __inline('./third.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('third.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
