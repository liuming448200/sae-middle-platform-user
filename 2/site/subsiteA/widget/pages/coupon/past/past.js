module.exports = {
  url: '/past',
  template: __inline('./past.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('past.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
