module.exports = {
  url: '/review',
  template: __inline('./review.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('review.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
