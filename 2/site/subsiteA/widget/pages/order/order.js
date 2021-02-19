module.exports = {
  url: '/order?from',
  template: __inline('./order.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('order.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
