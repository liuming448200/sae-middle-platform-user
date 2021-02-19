module.exports = {
  url: '/song/:song_id?language',
  template: __inline('./song.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('song.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
