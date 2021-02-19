module.exports = {
	url: '/success',
	template: __inline('./success.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
    require.async('success.async.js', function(ctrl) {
      $injector.invoke(ctrl, this, {'$scope': $scope});
    });
  }]
};
