module.exports = {
  url: '/message',
  template: __inline('./message.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('message.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
