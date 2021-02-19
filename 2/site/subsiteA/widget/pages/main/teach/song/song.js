var chinese = require('./chinese/chinese');
var english = require('./english/english');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/teach/song', '/main/teach/song/chinese');

  $stateProvider
    .state('main.teach.song.chinese', chinese)
    .state('main.teach.song.english', english);
}]);

module.exports = {
  url: '/song',
  template: __inline('./song.html')
};
