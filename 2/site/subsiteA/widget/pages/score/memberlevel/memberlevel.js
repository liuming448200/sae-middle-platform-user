module.exports = {
  url: '/memberlevel',
  template: __inline('./memberlevel.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('memberlevel.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
