module.exports = {
  url: '/chargedetail?from',
  template: __inline('./chargedetail.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('chargedetail.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
