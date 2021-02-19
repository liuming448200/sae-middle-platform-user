module.exports = {
  url: '/course',
  template: __inline('./course.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('course.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
