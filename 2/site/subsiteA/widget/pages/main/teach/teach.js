var story = require('./story/story');
var english = require('./english/english');
var song = require('./song/song');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/teach', '/main/teach/story');

  $stateProvider
    .state('main.teach.story', story)
    .state('main.teach.english', english)
    .state('main.teach.song', song);
}]);

module.exports = {
  url: '/teach',
  template: __inline('./teach.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('teach.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};

