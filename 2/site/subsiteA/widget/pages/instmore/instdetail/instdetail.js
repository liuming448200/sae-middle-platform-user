module.exports = {
  url: '/instdetail',
  template: __inline('./instdetail.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('instdetail.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
