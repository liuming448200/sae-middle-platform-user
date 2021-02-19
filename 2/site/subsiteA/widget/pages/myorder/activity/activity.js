var list = require('./list/list');
var detail = require('./detail/detail');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/myorder/activity', '/myorder/activity/list');

  $stateProvider
    .state('myorder.activity.list', list)
    .state('myorder.activity.detail', detail);
}]);

module.exports = {
  url: '/activity',
  template: __inline('./activity.html')
};
