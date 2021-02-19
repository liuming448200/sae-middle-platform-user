module.exports = {
  url: '/type',
  template: __inline('./type.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('type.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
