var type = require('./type/type');
var detail = require('./detail/detail');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/teach/english', '/main/teach/english/type');

  $stateProvider
    .state('main.teach.english.type', type)
    .state('main.teach.english.detail', detail);
}]);

module.exports = {
  url: '/english',
  template: __inline('./english.html')
};
