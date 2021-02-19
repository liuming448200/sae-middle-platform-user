module.exports = {
  url: '/product',
  template: __inline('./product.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('product.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
