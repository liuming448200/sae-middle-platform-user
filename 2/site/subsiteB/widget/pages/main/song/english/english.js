var list = require('./list/list');
var add = require('./add/add');
var edit = require('./edit/edit');
var preview = require('./preview/preview');

angular.module('eduApp.main.song.english', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/song/english', '/main/song/english/list');

  $stateProvider
    .state('main.song.english.list', list)
    .state('main.song.english.add', add)
    .state('main.song.english.edit', edit)
    .state('main.song.english.preview', preview);
}]);

module.exports = {
  url: '/english',
  template: __inline('./english.html')
};
