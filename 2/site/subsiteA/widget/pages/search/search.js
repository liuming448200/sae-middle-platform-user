module.exports = {
  url: '/search?from',
  template: __inline('./search.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('search.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
