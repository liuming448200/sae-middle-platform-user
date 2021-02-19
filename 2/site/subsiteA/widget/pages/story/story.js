module.exports = {
  url: '/story/:story_id',
  template: __inline('./story.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('story.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
