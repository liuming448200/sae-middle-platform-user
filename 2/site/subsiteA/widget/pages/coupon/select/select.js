module.exports = {
  url: '/select?from',
  template: __inline('./select.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('select.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
