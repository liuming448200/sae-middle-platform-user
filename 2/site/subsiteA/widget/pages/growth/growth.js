module.exports = {
  url: '/growth',
  template: __inline('./growth.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('growth.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
