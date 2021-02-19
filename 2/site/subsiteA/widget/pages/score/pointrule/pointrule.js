module.exports = {
  url: '/pointrule?from',
  template: __inline('./pointrule.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('pointrule.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
