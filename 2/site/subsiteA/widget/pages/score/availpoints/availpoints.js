module.exports = {
  url: '/availpoints?from',
  template: __inline('./availpoints.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('availpoints.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
