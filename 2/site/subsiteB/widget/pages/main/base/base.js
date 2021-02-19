var content = require('./content/content');
var application = require('./application/application');

angular.module('eduApp.main.base', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main.base.content', content)
    .state('main.base.application', application);
}]);

module.exports = {
  url: '/base',
  template: __inline('./base.html')
};
