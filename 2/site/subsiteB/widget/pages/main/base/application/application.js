var list = require('./list/list');

angular.module('eduApp.main.base.application', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main/base/application', '/main/base/application/list');

  $stateProvider
    .state('main.base.application.list', list);
}]);

module.exports = {
  url: '/application',
  template: __inline('./application.html')
};
