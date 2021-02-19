module.exports = {
  url: '/chargerecord?from',
  template: __inline('./chargerecord.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('chargerecord.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
