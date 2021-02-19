module.exports = {
  url: '/user',
  template: __inline('./user.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('user.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
