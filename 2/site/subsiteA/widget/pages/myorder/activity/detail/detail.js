module.exports = {
  url: '/detail',
  template: __inline('./detail.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('detail.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
