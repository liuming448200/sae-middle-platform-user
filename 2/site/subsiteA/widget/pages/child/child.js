var list = require('./list/list');
var add = require('./add/add');
var edit = require('./edit/edit');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/child', '/child/list');

  $stateProvider
    .state('child.list', list)
    .state('child.add', add)
    .state('child.edit', edit);
}]);

module.exports = {
  url: '/child',
  template: __inline('./child.html')
};
