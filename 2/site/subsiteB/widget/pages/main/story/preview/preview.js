module.exports = {
  url: '/preview?story_id',
  template: __inline('./preview.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('preview.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
