var list = require('./list/list');
var add = require('./add/add');
var edit = require('./edit/edit');
var preview = require('./preview/preview');

angular.module('eduApp.main.song.chinese', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/song/chinese', '/main/song/chinese/list');

  $stateProvider
    .state('main.song.chinese.list', list)
    .state('main.song.chinese.add', add)
    .state('main.song.chinese.edit', edit)
    .state('main.song.chinese.preview', preview);
}]);

module.exports = {
  url: '/chinese',
  template: __inline('./chinese.html')
};
