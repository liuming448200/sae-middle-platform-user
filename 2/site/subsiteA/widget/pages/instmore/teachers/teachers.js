module.exports = {
  url: '/teachers',
  template: __inline('./teachers.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('teachers.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
