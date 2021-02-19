require('checkMobileService');

module.exports = {
  url: '/first',
  template: __inline('./first.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('first.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
