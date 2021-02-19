module.exports = {
	url: '/failure',
	template: __inline('./failure.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
    require.async('failure.async.js', function(ctrl) {
      $injector.invoke(ctrl, this, {'$scope': $scope});
    });
  }]
};
