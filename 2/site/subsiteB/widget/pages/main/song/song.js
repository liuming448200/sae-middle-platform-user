require('songService');

var chinese = require('./chinese/chinese');
var english = require('./english/english');

angular.module('eduApp.main.song', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main.song.chinese', chinese)
    .state('main.song.english', english);
}]);

module.exports = {
	url: '/song',
	template: __inline('./song.html')
};
