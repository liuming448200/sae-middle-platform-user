module.exports = {
  url: '/add',
  template: __inline('./add.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('add.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
