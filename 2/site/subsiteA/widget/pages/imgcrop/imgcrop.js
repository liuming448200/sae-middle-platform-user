require('imgService');

module.exports = {
  url: '/imgcrop?from&source',
  template: __inline('./imgcrop.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('imgcrop.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
